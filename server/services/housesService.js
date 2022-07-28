const { Houses, Houses_Images } = require('../models')

class HousesService {
	async getAllHouses() {
		const houses = await Houses.findAll({
			include: [
				{
					model: Houses_Images,
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
					model: Houses_Images,
					as: 'images',
				},
			],
		})
		return houses
	}

	async getHouseById(id) {
		if (!id) throw new Error('Не указан ID')

		const house = await Houses.findByPk(id, {
			include: [
				{
					model: Houses_Images,
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

		const newImage = await Houses_Images.create(houseImage)
		return newImage
	}

	async updateHouse(id, house) {
		if (!id) throw new Error('Не указан ID')
		if (!house) throw new Error('Не верный формат')

		await Houses.update(house, { where: { id } })
		return await Houses.findByPk(id, {
			include: [
				{
					model: Houses_Images,
					as: 'images',
				},
			],
		})
	}

	async updateHouseImages(houseId, id, house) {
		if (!houseId) throw new Error('Не указан ID дома')
		if (!id) throw new Error('Не указан ID картинки')
		if (!house) throw new Error('Не верный формат')

		await Houses_Images.update(house, { where: { id, houseId } })
		return await Houses_Images.findOne({ where: { id, houseId } })
	}

	async deleteHouse(id) {
		if (!id) throw new Error('Не указан ID')

		const deleteHouse = await Houses.destroy({ where: { id } })
		return deleteHouse
	}

	async deleteHouseImages(houseId, id) {
		if (!houseId) throw new Error('Не указан ID дома')
		if (!id) throw new Error('Не указан ID картинки')

		const deleteHouseImages = await Houses_Images.destroy({
			where: { id, houseId },
		})
		return deleteHouseImages
	}
}

module.exports = new HousesService()
