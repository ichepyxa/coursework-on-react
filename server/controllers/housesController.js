const HousesService = require('../services/housesService')

class HousesController {
	async getAllHouses(req, res, next) {
		try {
			let page = req.query.page
			let houses

			if (page) {
				houses = await HousesService.getHousesWithPagination(page)
			} else {
				houses = await HousesService.getAllHouses()
			}

			res.json(houses)
		} catch (error) {
			next(error)
		}
	}

	async getHouseById(req, res, next) {
		try {
			const house = await HousesService.getHouseById(req.params.id)
			res.json(house)
		} catch (error) {
			next(error)
		}
	}

	async createHouse(req, res, next) {
		try {
			const newHouse = await HousesService.createHouse(req.body)
			res.json(newHouse)
		} catch (error) {
			next(error)
		}
	}

	async createHouseImages(req, res, next) {
		try {
			const newImage = await HousesService.createHouseImages(req.body)
			res.json(newImage)
		} catch (error) {
			next(error)
		}
	}

	async updateHouse(req, res, next) {
		try {
			const updateHouse = await HousesService.updateHouse(
				req.params.id,
				req.body
			)
			res.json(updateHouse)
		} catch (error) {
			next(error)
		}
	}

	async updateHouseImages(req, res, next) {
		try {
			const updateHouseImages = await HousesService.updateHouseImages(
				req.params.imageId,
				req.body
			)
			res.json(updateHouseImages)
		} catch (error) {
			next(error)
		}
	}

	async deleteHouse(req, res, next) {
		try {
			const deleteHouse = await HousesService.deleteHouse(req.params.id)
			res.json(deleteHouse)
		} catch (error) {
			next(error)
		}
	}

	async deleteHouseImages(req, res, next) {
		try {
			const deleteHouseImages = await HousesService.deleteHouseImages(
				req.params.imageId
			)
			res.json(deleteHouseImages)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new HousesController()
