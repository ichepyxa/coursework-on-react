const { users: Users } = require('../models')
const fs = require('fs')
const config = require('../config/server_config')
const APIError = require('../exceptions/apiExceptions')

const imagesType = ['image/jpg', 'image/png', 'image/jpeg']

class FilesService {
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
