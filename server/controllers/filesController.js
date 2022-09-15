const FilesService = require('../services/filesService')

class FilesController {
	async uploadAvatar(req, res, next) {
		try {
			const fileAvatar = req.files?.avatar || null
			const userId = req.user.userId || null
			const avatar = await FilesService.uploadAvatar(userId, fileAvatar)
			res.json(avatar)
		} catch (error) {
			next(error)
		}
	}

	async deleteAvatar(req, res, next) {
		try {
			const userId = req.user.userId || null
			const avatar = await FilesService.deleteAvatar(userId)
			res.json(avatar)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new FilesController()
