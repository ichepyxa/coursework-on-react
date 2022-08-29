const {
	houses: Houses,
	houses_images: HousesImages,
	sequelize,
} = require('../models')

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

	async getHousesWithPagination(page = 1) {
		if (!page || page < 1 || isNaN(page))
			throw new Error('Указана несуществующая страница')

		const limit = 15
		const offset = (page - 1) * limit

		const houses = await Houses.findAll({
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
			'SELECT COUNT(*) as count FROM houses',
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
