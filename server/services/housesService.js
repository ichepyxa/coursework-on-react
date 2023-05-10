const {
  users_favorites_houses: UsersFavoritesHouses,
  houses: Houses,
  houses_images: HousesImages,
  houses_services: HousesServices,
  users_booking: UsersBooking,
  services: Services,
  sequelize,
} = require('../models')
const config = require('../config/server_config')
const {Op} = require('sequelize')
const Regions = require('../constants/Regions')
const FilesService = require('./filesService')
const mailService = require('./mailService')
const {getUser} = require('./usersService')

class HousesService {
  async getAllHouses() {
    const houses = await Houses.findAll({
      include: [
        {
          model: HousesImages,
          as: 'images',
        },
      ],
    })
    return houses
  }

  async getHousesWithServices() {
    const housesServices = await HousesServices.findAll({
      include: [
        {
          model: Houses,
          as: 'houses',
          include: [
            {
              model: HousesImages,
              as: 'images',
            },
          ],
        },
        {
          model: Services,
          as: 'services',
        },
      ],
    })

    const formatHousesServices = housesServices => {
      const houses = []

      for (const houseService of housesServices) {
        const house = houses.find(
          element => element.houseId === houseService.houses.houseId
        )

        if (house) {
          if (
            house.services &&
            !house.services.includes(houseService.services.name)
          ) {
            house.services.push(houseService.services.name)
          } else {
            house.services = [houseService.services.name]
          }

          continue
        }

        houses.push(houseService.houses)
      }

      return houses.map(item => {
        return {...item.dataValues, services: item.services}
      })
    }

    return formatHousesServices(housesServices)
  }

  async getHousesWithParams(page = 1, name = '', region = 1) {
    if (!page || page < 1 || isNaN(page))
      throw new Error('Указана несуществующая страница')

    const limit = 15
    const offset = (page - 1) * limit

    const houses = await Houses.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        location: {
          [Op.like]: `${Regions[region]}%`,
        },
      },
      limit: limit,
      offset: offset,
      include: [
        {
          model: HousesImages,
          as: 'images',
        },
      ],
    })

    const housesCount = await sequelize.query(
      `SELECT COUNT(*) as count
       FROM houses
       WHERE location LIKE '%${Regions[region]}%' AND name LIKE '%${name}%'`,
      {plain: true}
    )

    return {count: Math.ceil(housesCount.count / limit), houses}
  }

  async getHouseById(houseId) {
    if (!houseId) throw new Error('Не указан ID места отдыха')

    const house = await Houses.findByPk(houseId, {
      include: [
        {
          model: HousesImages,
          as: 'images',
        },
      ],
    })

    // let recomendedHouses
    // if (house) {
    // 	recomendedHouses = await Houses.findAll({
    // 		where: {
    // 			houseId: {
    // 				[Op.not]: house.houseId,
    // 			},
    // 			category: {
    // 				[Op.like]: `%${house.category}%`,
    // 			},
    // 		},
    // 		limit: 10,
    // 	})
    // }

    // return { currentHouse: house, recomendedHouses }
    return house
  }

  async createHouse(house, images) {
    if (!house) throw new Error('Не верный формат')

    const newHouse = await Houses.create(house)

    if (images) {
      !images.length
        ? await FilesService.uploadHouseImage(newHouse.houseId, images)
        : images.map(
          async image =>
            await FilesService.uploadHouseImage(newHouse.houseId, image)
        )
    }

    return newHouse
  }

  async updateHouse(houseId, house, images) {
    if (!houseId) throw new Error('Не указан ID места отдыха')
    if (!house) throw new Error('Не верный формат')

    const houseFromDB = await Houses.findByPk(houseId)
    if (!houseFromDB) throw new Error('Не верный ID места отдыха')

    if (house.deletedImages) {
      typeof house.deletedImages === 'string'
        ? await this.deleteHouseImages(house.deletedImages)
        : house.deletedImages.map(
          async imageId => await this.deleteHouseImages(imageId)
        )
    }

    if (images) {
      !images.length
        ? await FilesService.uploadHouseImage(houseFromDB.houseId, images)
        : images.map(
          async image =>
            await FilesService.uploadHouseImage(houseFromDB.houseId, image)
        )
    }

    await Houses.update({...house, houseId}, {where: {houseId}})
    return await Houses.findByPk(houseId, {
      include: [
        {
          model: HousesImages,
          as: 'images',
        },
      ],
    })
  }

  async deleteHouse(houseId) {
    if (!houseId) throw new Error('Не указан ID места отдыха')

    const houseFromDB = await Houses.findByPk(houseId)
    if (!houseFromDB) throw new Error('Не верный ID места отдыха')

    const deleteHouse = await Houses.destroy({where: {houseId}})
    return deleteHouse
  }

  async deleteHouseImages(imageId) {
    if (!imageId) throw new Error('Не указан ID картинки')

    const imageFromDB = await HousesImages.findByPk(imageId)
    if (!imageFromDB) throw new Error('Не верный ID картинки')

    if (imageFromDB.image.includes(config.API_URL)) {
      await FilesService.deleteHouseImage(imageFromDB.image).then(async () => {
        imageFromDB.image = ''
        await imageFromDB.save()
      })
    }

    const deleteHouseImages = await HousesImages.destroy({
      where: {imageId},
    })
    return deleteHouseImages
  }

  async getFavoritesHouses(user) {
    if (!user) throw APIError.UnautorizedError()

    const houses = await UsersFavoritesHouses.findAll({
      where: {userId: user.userId},
    })

    const favoritesHouses = []
    let i = 0
    while (i < houses.length) {
      await this.getHouseById(houses[i].houseId).then(data => {
        favoritesHouses.push(data)
        i++
      })
    }

    return {houses: favoritesHouses}
  }

  async addFavoritesHouses(user, houseId) {
    if (!user) throw APIError.UnautorizedError()
    if (!houseId) throw new Error('Не указан ID места отдыха')

    const houseFromDB = await Houses.findOne({
      where: {houseId},
    })
    if (!houseFromDB) throw new Error('Не верный ID места отдыха')

    const dublicate = await UsersFavoritesHouses.findOne({
      where: {
        userId: user.userId,
        houseId,
      },
    })
    if (dublicate) throw new Error('Такой дом уже в избранном')

    const favoriteHouse = await UsersFavoritesHouses.create({
      userId: user.userId,
      houseId,
    })
    return {house: favoriteHouse}
  }

  async deleteFavoritesHouses(user, houseId) {
    if (!user) throw APIError.UnautorizedError()
    if (!houseId) throw new Error('Не указан ID места отдыха')

    const houseFromDB = await Houses.findOne({
      where: {houseId},
    })
    if (!houseFromDB) throw new Error('Не верный ID места отдыха')

    const favoriteHouse = await UsersFavoritesHouses.destroy({
      where: {
        userId: user.userId,
        houseId,
      },
    })
    return favoriteHouse
  }

  async isBookingHouse(user, houseId) {
    if (!user) throw APIError.UnautorizedError()
    if (!houseId) throw new Error('Не указан ID места отдыха')

    const houseFromDB = await Houses.findByPk(houseId)
    if (!houseFromDB) throw new Error('Не верный ID места отдыха')

    const usersBooking = await UsersBooking.findOne({
      where: {houseId, userId: user.userId},
      order: [ [ 'createdAt', 'DESC' ]],
    })

    if (!usersBooking) throw new Error('Забронированое место не найдено')

    let isBooking = false
    switch (usersBooking.status) {
      case 'На рассмотрении':
        isBooking = true;
        break;
      case 'Отклонено':
        isBooking = false;
        break;
      case 'Забронированно':
        isBooking = false;
        break;
    }

    return {
      'isBooking': isBooking,
      'status': usersBooking.status,
    }
  }

  async getBookingHouses(user) {
    if (!user) throw APIError.UnautorizedError()

    const usersBooking = await UsersBooking.findAll({
      where: {userId: user.userId},
    })

    let houses = []
    for (let i = 0; i < usersBooking.length; i++) {
      const house = await this.getHouseById(usersBooking[i].houseId)

      if (house) {
        const newHouse = JSON.parse(JSON.stringify(house))
        newHouse.status = usersBooking[i].status

        houses.push(newHouse)
      }
    }

    return houses
  }

  async updateBookingStatus(bookingId, status) {
    if (!bookingId) throw new Error('Не указан ID бронирования')

    await UsersBooking.update(
      {
        status,
      },
      {
        where: {bookingId},
      }
    )
  }

  async getAllBookingHouses() {
    const usersBooking = await UsersBooking.findAll()

    let houses = []
    for (let i = 0; i < usersBooking.length; i++) {
      const house = await this.getHouseById(usersBooking[i].houseId)
      const user = await getUser(usersBooking[i].userId)

      if (house) {
        const newHouse = JSON.parse(JSON.stringify(house))
        newHouse.status = usersBooking[i].status
        newHouse.user = user
        newHouse.bookingId = usersBooking[i].bookingId

        houses.push(newHouse)
      }
    }

    return houses
  }

  async addBookingHouse(user, houseId) {
    if (!user) throw APIError.UnautorizedError()
    if (!houseId) throw new Error('Не указан ID места отдыха')

    const houseFromDB = await Houses.findOne({
      where: {houseId},
      include: [
        {
          model: HousesImages,
          as: 'images',
        },
      ],
    })
    if (!houseFromDB) throw new Error('Не верный ID места отдыха')

    await mailService.sendBookingReport(user.email, houseFromDB, user.username)
    const bookingHouse = await UsersBooking.create({
      userId: user.userId,
      houseId,
    })

    return bookingHouse
  }
}

module.exports = new HousesService()
