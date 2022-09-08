const {
	users: Users,
	users_favorites_houses: UsersFavoritesHouses,
	houses: Houses,
	houses_images: HousesImages,
	sequelize,
} = require('../models')
const { Op } = require('sequelize')

const Regions = {
	1: '',
	2: 'Минская область',
	3: 'Брестская область',
	4: 'Витебская область',
	5: 'Гомельская область',
	6: 'Гродненская область',
	7: 'Могилевская область',
}

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
			`SELECT COUNT(*) as count FROM houses WHERE location LIKE '${Regions[region]}%' AND name LIKE '%${name}%'`,
			{ plain: true }
		)

		return { count: Math.ceil(housesCount.count / limit), houses }
	}

	async getHouseById(houseId) {
		if (!houseId) throw new Error('Не указан ID дома')

		const house = await Houses.findByPk(houseId, {
			include: [
				{
					model: HousesImages,
					as: 'images',
				},
			],
		})
		return house
	}

	async createHouse(house) {
		if (!house) throw new Error('Не верный формат')

		const newHouse = await Houses.create(house)
		return newHouse
	}

	async createHouseImages(houseId, houseImage) {
		if (!houseId) throw new Error('Не указан ID дома')
		if (!houseImage) throw new Error('Не верный формат')

		const houseFromDB = await Houses.findByPk(houseId)
		if (!houseFromDB) throw new Error('Не верный ID дома')

		const newImage = await HousesImages.create({ image: houseImage, houseId })
		return newImage
	}

	async updateHouse(houseId, house) {
		if (!houseId) throw new Error('Не указан ID дома')
		if (!house) throw new Error('Не верный формат')

		const houseFromDB = await Houses.findByPk(houseId)
		if (!houseFromDB) throw new Error('Не верный ID дома')

		await Houses.update({ ...house, houseId }, { where: { houseId } })
		return await Houses.findByPk(houseId, {
			include: [
				{
					model: HousesImages,
					as: 'images',
				},
			],
		})
	}

	async updateHouseImages(imageId, image) {
		if (!imageId) throw new Error('Не указан ID картинки')
		if (!image) throw new Error('Не верный формат')

		const imageFromDB = await HousesImages.findByPk(imageId)
		if (!imageFromDB) throw new Error('Не верный ID картинки')

		await HousesImages.update({ image }, { where: { imageId } })
		return await HousesImages.findOne({ where: { imageId } })
	}

	async deleteHouse(houseId) {
		if (!houseId) throw new Error('Не указан ID дома')

		const houseFromDB = await Houses.findByPk(houseId)
		if (!houseFromDB) throw new Error('Не верный ID дома')

		const deleteHouse = await Houses.destroy({ where: { houseId } })
		return deleteHouse
	}

	async deleteHouseImages(imageId) {
		if (!imageId) throw new Error('Не указан ID картинки')

		const imageFromDB = await HousesImages.findByPk(imageId)
		if (!imageFromDB) throw new Error('Не верный ID картинки')

		const deleteHouseImages = await HousesImages.destroy({
			where: { imageId },
		})
		return deleteHouseImages
	}
}

module.exports = new HousesService()
