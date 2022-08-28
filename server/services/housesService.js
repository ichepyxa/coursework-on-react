const { houses: Houses, houses_images: HousesImages } = require('../models')

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

		const offset = (page - 1) * 20

		const houses = await Houses.findAll({
			limit: 20,
			offset: offset,
			include: [
				{
					model: HousesImages,
					as: 'images',
				},
			],
		})
		return houses
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

	async createHouseImages(houseImage) {
		if (!houseImage) throw new Error('Не верный формат')

		const newImage = await HousesImages.create(houseImage)
		return newImage
	}

	async updateHouse(houseId, house) {
		if (!houseId) throw new Error('Не указан ID дома')
		if (!house) throw new Error('Не верный формат')

		await Houses.update(house, { where: { houseId } })
		return await Houses.findByPk(houseId, {
			include: [
				{
					model: HousesImages,
					as: 'images',
				},
			],
		})
	}

	async updateHouseImages(imageId, house) {
		if (!imageId) throw new Error('Не указан ID картинки')
		if (!house) throw new Error('Не верный формат')

		await HousesImages.update(house, { where: { imageId } })
		return await HousesImages.findOne({ where: { imageId } })
	}

	async deleteHouse(houseId) {
		if (!houseId) throw new Error('Не указан ID дома')

		const deleteHouse = await Houses.destroy({ where: { houseId } })
		return deleteHouse
	}

	async deleteHouseImages(imageId) {
		if (!imageId) throw new Error('Не указан ID картинки')

		const deleteHouseImages = await Houses_Images.destroy({
			where: { imageId },
		})
		return deleteHouseImages
	}
}

module.exports = new HousesService()
