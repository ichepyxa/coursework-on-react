const {
	users: Users,
	houses: Houses,
	sights: Sights,
	houses_images: HousesImages,
	sights_images: SightsImages,
} = require('../models')
const fs = require('fs')
const config = require('../config/server_config')
const APIError = require('../exceptions/apiExceptions')

const imagesType = ['image/jpg', 'image/png', 'image/jpeg']

class FilesService {
	async uploadHouseImage(houseId, image) {
		if (!image) throw APIError.BadRequest('Вы не загрузили фото')

		const house = await Houses.findOne({ where: { houseId } })
		if (!house) throw APIError.BadRequest('Место отдыха не найдено')

		if (!imagesType.includes(image.mimetype))
			throw APIError.BadRequest('Не корректный формат фото')

		const maxImageSize = 10 * 1000 * 1000
		if (image.size > maxImageSize)
			throw APIError.BadRequest(
				'Фото превышает максимальный вес (10 мегабайта)'
			)

		const newImage = await HousesImages.create({ image: '', houseId })

		const imageType = image.name.split('.').pop()
		const path = `${config.FILES_PATH}/images/houses/${houseId}`

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true })
		}

		const fullPath = `${path}/house-img-${newImage.imageId}.${imageType}`
		image.mv(fullPath)

		newImage.image = `${config.API_URL}/${fullPath}`
		await newImage.save()

		return { image: fullPath }
	}

	async deleteHouseImage(image) {
		const imagePath = image.replace(`${config.API_URL}/`, '')
		if (fs.existsSync(imagePath)) {
			fs.rmSync(imagePath)
			return { image }
		}
	}

	async uploadSightImage(sightId, image) {
		if (!image) throw APIError.BadRequest('Вы не загрузили фото')

		const sight = await Sights.findOne({ where: { sightId } })
		if (!sight) throw APIError.BadRequest('Достопримечательность не найдено')

		if (!imagesType.includes(image.mimetype))
			throw APIError.BadRequest('Не корректный формат фото')

		const maxImageSize = 10 * 1000 * 1000
		if (image.size > maxImageSize)
			throw APIError.BadRequest(
				'Фото превышает максимальный вес (10 мегабайта)'
			)

		const newImage = await SightsImages.create({ image: '', sightId })

		const imageType = image.name.split('.').pop()
		const path = `${config.FILES_PATH}/images/sights/${sightId}`

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true })
		}

		const fullPath = `${path}/sight-img-${newImage.imageId}.${imageType}`
		image.mv(fullPath)

		newImage.image = `${config.API_URL}/${fullPath}`
		await newImage.save()

		return { image: fullPath }
	}

	async deleteSightImage(image) {
		const imagePath = image.replace(`${config.API_URL}/`, '')
		if (fs.existsSync(imagePath)) {
			fs.rmSync(imagePath)
			return { image }
		}
	}

	async uploadAvatar(userId, avatar) {
		if (!avatar) throw APIError.BadRequest('Вы не загрузили фото')

		const user = await Users.findOne({ where: { userId } })
		if (!user) throw APIError.BadRequest('Пользователь не найден')

		if (!imagesType.includes(avatar.mimetype))
			throw APIError.BadRequest('Не корректный формат фото')

		const maxAvatarSize = 5 * 1000 * 1000
		if (avatar.size > maxAvatarSize)
			throw APIError.BadRequest('Фото превышает максимальный вес (5 мегабайта)')

		const avatarType = avatar.name.split('.').pop()
		const path = `${config.FILES_PATH}/avatars/${userId}`

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true })
		}

		if (user.avatar && fs.existsSync(user.avatar)) {
			fs.rmSync(user.avatar)
		}

		const fullPath = `${path}/avatar.${avatarType}`
		avatar.mv(fullPath)

		user.avatar = fullPath
		await user.save()

		return { avatar: fullPath }
	}

	async deleteAvatar(userId) {
		const user = await Users.findOne({ where: { userId } })
		if (!user) throw APIError.BadRequest('Пользователь не найден')

		if (fs.existsSync(user.avatar)) {
			fs.rmSync(user.avatar)
			user.avatar = ''
			await user.save()

			return { avatar: user.avatar }
		}
	}
}

module.exports = new FilesService()
