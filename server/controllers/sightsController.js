const SightsService = require('../services/sightsService')

class SightsController {
	async getAllSights(req, res, next) {
		try {
			let { page, name, region } = req.query
			let sights

			if (page || name || region) {
				sights = await SightsService.getSightsWithParams(page, name, region)
			} else {
				sights = await SightsService.getAllSights()
			}

			res.json(sights)
		} catch (error) {
			next(error)
		}
	}

	async getSightById(req, res, next) {
		try {
			const sight = await SightsService.getSightById(req.params.sightId)
			res.json(sight)
		} catch (error) {
			next(error)
		}
	}

	async createSight(req, res, next) {
		try {
			const images = req.files?.images || null
			const newSight = await SightsService.createSight(req.body, images)
			res.json(newSight)
		} catch (error) {
			next(error)
		}
	}

	async updateSight(req, res, next) {
		try {
			const images = req.files?.images || null
			const updateSight = await SightsService.updateSight(
				req.params.sightId,
				req.body,
				images
			)
			res.json(updateSight)
		} catch (error) {
			next(error)
		}
	}

	async deleteSight(req, res, next) {
		try {
			const deleteSight = await SightsService.deleteSight(req.params.sightId)
			res.json(deleteSight)
		} catch (error) {
			next(error)
		}
	}

	async getFavoritesSights(req, res, next) {
		try {
			const sights = await SightsService.getFavoritesSights(req.user)
			res.json(sights)
		} catch (error) {
			next(error)
		}
	}

	async addFavoritesSights(req, res, next) {
		try {
			const sight = await SightsService.addFavoritesSights(
				req.user,
				req.body.sightId
			)
			res.json(sight)
		} catch (error) {
			next(error)
		}
	}

	async deleteFavoritesSights(req, res, next) {
		try {
			const sight = await SightsService.deleteFavoritesSigths(
				req.user,
				req.params.sightId
			)
			res.json(sight)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new SightsController()
