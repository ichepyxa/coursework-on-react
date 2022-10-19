const {
	users: Users,
	houses: Houses,
	houses_images: HousesImages,
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

	async deleteHouseImage(imageId) {
		const imageFromDB = await HousesImages.findOne({ where: { imageId } })
		if (!imageFromDB)
			throw APIError.BadRequest('Картинка места отдыха не найдена')

		const imagePath = imageFromDB.image.replace(`${config.API_URL}/`, '')
		if (fs.existsSync(imagePath)) {
			fs.rmSync(imagePath)
			imageFromDB.image = ''
			await imageFromDB.save()

			return { image: imageFromDB.image }
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
