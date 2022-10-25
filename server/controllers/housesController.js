const { isStringObject } = require('util/types')
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
			const images = req.files?.images || null
			const newHouse = await HousesService.createHouse(req.body, images)
			res.json(newHouse)
		} catch (error) {
			next(error)
		}
	}

	async updateHouse(req, res, next) {
		try {
			const images = req.files?.images || null
			const updateHouse = await HousesService.updateHouse(
				req.params.houseId,
				req.body,
				images
			)
			res.json(updateHouse)
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

	async getFavoritesHouses(req, res, next) {
		try {
			const houses = await HousesService.getFavoritesHouses(req.user)
			res.json(houses)
		} catch (error) {
			next(error)
		}
	}

	async addFavoritesHouses(req, res, next) {
		try {
			const house = await HousesService.addFavoritesHouses(
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
