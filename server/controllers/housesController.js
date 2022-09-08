const HousesService = require('../services/housesService')

class HousesController {
	async getAllHouses(req, res, next) {
		try {
			let { page, name, region } = req.query
			let houses

			if (page || name || region) {
				houses = await HousesService.getHousesWithParams(page, name, region)
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
			const house = await HousesService.getHouseById(req.params.houseId)
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
			const newImage = await HousesService.createHouseImages(
				req.params.houseId,
				req.body.image
			)
			res.json(newImage)
		} catch (error) {
			next(error)
		}
	}

	async updateHouse(req, res, next) {
		try {
			const updateHouse = await HousesService.updateHouse(
				req.params.houseId,
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
				req.body.image
			)
			res.json(updateHouseImages)
		} catch (error) {
			next(error)
		}
	}

	async deleteHouse(req, res, next) {
		try {
			const deleteHouse = await HousesService.deleteHouse(req.params.houseId)
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

	async getFavoritesHouses(req, res, next) {
		try {
			const houses = await HousesService.getFavoritesHouses(req.user)
			res.json(houses)
		} catch (error) {
			next(error)
		}
	}

	async createFavoritesHouses(req, res, next) {
		try {
			const house = await HousesService.createFavoritesHouses(
				req.user,
				req.body.houseId
			)
			res.json(house)
		} catch (error) {
			next(error)
		}
	}

	async deleteFavoritesHouses(req, res, next) {
		try {
			const house = await HousesService.deleteFavoritesHouses(
				req.user,
				req.params.houseId
			)
			res.json(house)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new HousesController()
