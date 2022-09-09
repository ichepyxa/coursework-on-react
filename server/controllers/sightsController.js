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
			const newSight = await SightsService.createSight(req.body)
			res.json(newSight)
		} catch (error) {
			next(error)
		}
	}

	async createSightImages(req, res, next) {
		try {
			const newImage = await SightsService.createSightImages(
				req.params.sightId,
				req.body.image
			)
			res.json(newImage)
		} catch (error) {
			next(error)
		}
	}

	async updateSight(req, res, next) {
		try {
			const updateSight = await SightsService.updateSight(
				req.params.sightId,
				req.body
			)
			res.json(updateSight)
		} catch (error) {
			next(error)
		}
	}

	async updateSightImages(req, res, next) {
		try {
			const updateSightImages = await SightsService.updateSightImages(
				req.params.imageId,
				req.body.image
			)
			res.json(updateSightImages)
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

	async deleteSightImages(req, res, next) {
		try {
			const deleteSightImages = await SightsService.deleteSightImages(
				req.params.imageId
			)
			res.json(deleteSightImages)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new SightsController()
