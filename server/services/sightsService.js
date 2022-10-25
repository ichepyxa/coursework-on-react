const {
	sights: Sights,
	sights_images: SightsImages,
	users_favorites_sights: UsersFavoritesSights,
	sequelize,
} = require('../models')
const { Op } = require('sequelize')
const Regions = require('../constants/Regions')
const FilesService = require('./filesService')
const config = require('../config/server_config')

class SightsService {
	async getAllSights() {
		const sights = await Sights.findAll({
			include: [
				{
					model: SightsImages,
					as: 'images',
				},
			],
		})
		return sights
	}

	async getSightsWithParams(page = 1, name = '', region = 1) {
		if (!page || page < 1 || isNaN(page))
			throw new Error('Указана несуществующая страница')

		const limit = 15
		const offset = (page - 1) * limit

		const sights = await Sights.findAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
				location: {
					[Op.like]: `${Regions[region]}%`,
				},
			},
			limit: limit,
			offset: offset,
			include: [
				{
					model: SightsImages,
					as: 'images',
				},
			],
		})

		const sightsCount = await sequelize.query(
			`SELECT COUNT(*) as count FROM sights WHERE location LIKE '%${Regions[region]}%' AND name LIKE '%${name}%'`,
			{ plain: true }
		)

		return { count: Math.ceil(sightsCount.count / limit), sights }
	}

	async getSightById(sightId) {
		if (!sightId) throw new Error('Не указан ID достопримечательности')

		const sight = await Sights.findByPk(sightId, {
			include: [
				{
					model: SightsImages,
					as: 'images',
				},
			],
		})
		return sight
	}

	async createSight(sight, images) {
		if (!sight) throw new Error('Не верный формат')

		const newSight = await Sights.create(sight)

		if (images) {
			!images.length
				? await FilesService.uploadSightImage(newSight.sightId, images)
				: images.map(
						async image =>
							await FilesService.uploadSightImage(newSight.sightId, image)
				  )
		}

		return newSight
	}

	async updateSight(sightId, sight, images) {
		if (!sightId) throw new Error('Не указан ID достопримечательности')
		if (!sight) throw new Error('Не верный формат')

		const sightFromDB = await Sights.findByPk(sightId)
		if (!sightFromDB) throw new Error('Не верный ID достопримечательности')

		if (sight.deletedImages) {
			typeof sight.deletedImages === 'string'
				? await this.deleteSightImages(sight.deletedImages)
				: sight.deletedImages.map(
						async imageId => await this.deleteSightImages(imageId)
				  )
		}

		if (images) {
			!images.length
				? await FilesService.uploadSightImage(sightFromDB.sightId, images)
				: images.map(
						async image =>
							await FilesService.uploadSightImage(sightFromDB.sightId, image)
				  )
		}

		await Sights.update({ ...sight, sightId }, { where: { sightId } })
		return await Sights.findByPk(sightId, {
			include: [
				{
					model: SightsImages,
					as: 'images',
				},
			],
		})
	}

	async deleteSight(sightId) {
		if (!sightId) throw new Error('Не указан ID достопримечательности')

		const sightFromDB = await Sights.findByPk(sightId)
		if (!sightFromDB) throw new Error('Не верный ID достопримечательности')

		const deleteSight = await Sights.destroy({ where: { sightId } })
		return deleteSight
	}

	async deleteSightImages(imageId) {
		if (!imageId) throw new Error('Не указан ID картинки')

		const imageFromDB = await SightsImages.findByPk(imageId)
		if (!imageFromDB) throw new Error('Не верный ID картинки')

		if (imageFromDB.image.includes(config.API_URL)) {
			await FilesService.deleteSightImage(imageFromDB.image).then(async () => {
				imageFromDB.image = ''
				await imageFromDB.save()
			})
		}

		const deleteSightImages = await SightsImages.destroy({
			where: { imageId },
		})
		return deleteSightImages
	}

	async getFavoritesSights(user) {
		if (!user) throw APIError.UnautorizedError()

		const sights = await UsersFavoritesSights.findAll({
			where: { userId: user.userId },
		})

		const favoritesSights = []
		let i = 0
		while (i < sights.length) {
			await this.getSightById(sights[i].sightId).then(data => {
				favoritesSights.push(data)
				i++
			})
		}

		return { sights: favoritesSights }
	}

	async addFavoritesSights(user, sightId) {
		if (!user) throw APIError.UnautorizedError()
		if (!sightId) throw new Error('Не указан ID достопримечательности')

		const sightFromDB = await Sights.findOne({
			where: { sightId },
		})
		if (!sightFromDB) throw new Error('Не верный ID достопримечательности')

		const dublicate = await UsersFavoritesSights.findOne({
			where: {
				userId: user.userId,
				sightId,
			},
		})
		if (dublicate)
			throw new Error('Такая достопримечательность уже в избранном')

		const favoriteSight = await UsersFavoritesSights.create({
			userId: user.userId,
			sightId,
		})
		return { sight: favoriteSight }
	}

	async deleteFavoritesSigths(user, sightId) {
		if (!user) throw APIError.UnautorizedError()
		if (!sightId) throw new Error('Не указан ID достопримечательности')

		const sightFromDB = await Sights.findOne({
			where: { sightId },
		})
		if (!sightFromDB) throw new Error('Не верный ID достопримечательности')

		const favoriteSight = await UsersFavoritesSights.destroy({
			where: {
				userId: user.userId,
				sightId,
			},
		})
		return favoriteSight
	}
}

module.exports = new SightsService()
