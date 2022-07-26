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
			console.log(error)
		}
	}

	async getHouseById(req, res, next) {
		try {
			const house = await HousesService.getHouseById(req.params.id)
			res.json(house)
		} catch (error) {
			console.log(error)
		}
	}

	async createHouse(req, res, next) {
		try {
			const newHouse = await HousesService.createHouse(req.body)
			res.json(newHouse)
		} catch (error) {
			console.log(error)
		}
	}

	async createHouseImages(req, res, next) {
		try {
			const newImage = await HousesService.createHouseImages(req.body)
			res.json(newImage)
		} catch (error) {
			console.log(error)
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
			console.log(error)
		}
	}

	async updateHouseImages(req, res, next) {
		try {
			const updateHouseImages = await HousesService.updateHouseImages(
				req.params.houseId,
				req.query.imageId,
				req.body
			)
			res.json(updateHouseImages)
		} catch (error) {
			console.log(error)
		}
	}

	async deleteHouse(req, res, next) {
		try {
			const deleteHouse = await HousesService.deleteHouse(req.params.id)
			res.json(deleteHouse)
		} catch (error) {
			console.log(error)
		}
	}

	async deleteHouseImages(req, res, next) {
		try {
			const deleteHouseImages = await HousesService.deleteHouseImages(
				req.params.houseId,
				req.query.imageId
			)
			res.json(deleteHouseImages)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new HousesController()
