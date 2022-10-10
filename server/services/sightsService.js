const {
	sights: Sights,
	sights_images: SightsImages,
	users_favorites_sights: UsersFavoritesSights,
	sequelize,
} = require('../models')
const { Op } = require('sequelize')
const Regions = require('../constants/Regions')

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
		if (!sightId) throw new Error('Не указан ID дома')

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

	async createSight(sight) {
		if (!sight) throw new Error('Не верный формат')

		const newSight = await Sights.create(sight)
		return newSight
	}

	async createSightImages(sightId, sightImage) {
		if (!sightId) throw new Error('Не указан ID дома')
		if (!sightImage) throw new Error('Не верный формат')

		const sightFromDB = await Sights.findByPk(sightId)
		if (!sightFromDB) throw new Error('Не верный ID дома')

		const newSight = await SightsImages.create({ image: sightImage, sightId })
		return newSight
	}

	async updateSight(sightId, sight) {
		if (!sightId) throw new Error('Не указан ID дома')
		if (!sight) throw new Error('Не верный формат')

		const sightFromDB = await Sights.findByPk(sightId)
		if (!sightFromDB) throw new Error('Не верный ID дома')

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

	async updateSightImages(sightId, image) {
		if (!sightId) throw new Error('Не указан ID картинки')
		if (!image) throw new Error('Не верный формат')

		const imageFromDB = await SightsImages.findByPk(sightId)
		if (!imageFromDB) throw new Error('Не верный ID картинки')

		await SightsImages.update({ image }, { where: { sightId } })
		return await SightsImages.findOne({ where: { sightId } })
	}

	async deleteSight(sightId) {
		if (!sightId) throw new Error('Не указан ID дома')

		const sightFromDB = await Sights.findByPk(sightId)
		if (!sightFromDB) throw new Error('Не верный ID дома')

		const deleteSight = await Sights.destroy({ where: { sightId } })
		return deleteSight
	}

	async deleteSightImages(sightId) {
		if (!sightId) throw new Error('Не указан ID картинки')

		const imageFromDB = await SightsImages.findByPk(sightId)
		if (!imageFromDB) throw new Error('Не верный ID картинки')

		const deleteSightImages = await SightsImages.destroy({
			where: { sightId },
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
