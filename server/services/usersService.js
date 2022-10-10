const { users: Users, users_roles: UsersRoles } = require('../models')
const bcypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const config = require('../config/server_config')
const APIError = require('../exceptions/apiExceptions')
const TokenService = require('./tokenService')

const checkIsAdmin = async user => {
	const userRole = await UsersRoles.findOne({
		where: { roleId: user.roleId },
	})

	if (['ADMIN'].includes(userRole.role)) {
		return true
	}
	return false
}

class UsersService {
	async generateResponse(
		userId,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
		avatar,
		roleId,
		isAdmin = false
	) {
		const payload = {
			userId,
			username,
			email,
			activationLink,
			isActivated,
			isPassedTest,
			avatar,
			roleId,
			isAdmin,
		}

		const tokens = TokenService.generateTokens(payload)
		await TokenService.saveRefreshToken(userId, tokens.refreshToken)

		return {
			...tokens,
			user: payload,
		}
	}

	async getAllUsers() {
		const users = await Users.findAll()
		return users
	}

	async activateUser(activationLink) {
		const user = await Users.findOne({ where: { activationLink } })
		if (!activationLink && !user) {
			throw APIError.BadRequest('Некорректная ссылка активации')
		}

		if (user.isActivated === true) {
			throw APIError.BadRequest('Аккаунт уже активирован')
		}

		user.isActivated = true
		await user.save()
	}

	async registrationUsers(username, email, password) {
		const candidate = await Users.findOne({ where: { email } })
		if (candidate) {
			throw APIError.BadRequest(
				`Пользователь с почтовым адресом ${email} уже существует.`
			)
		}

		const activationLink = uuid.v4()
		const hashPassword = await bcypt.hash(password, 10)
		const user = await Users.create({
			username,
			email,
			password: hashPassword,
			activationLink,
		})

		await mailService.sendActivationAccountMail(
			email,
			`${config.API_URL}/api/users/activate/${activationLink}`
		)

		const isAdmin = await checkIsAdmin(user)
		const response = await this.generateResponse(
			user.userId,
			user.username,
			user.email,
			user.activationLink,
			user.isActivated,
			user.isPassedTest,
			user.avatar,
			user.roleId,
			isAdmin
		)
		return response
	}

	async loginUsers(email, password) {
		const user = await Users.findOne({ where: { email } })
		if (!user) {
			throw APIError.BadRequest(
				`Пользователь с почтовым адресом ${email} не существует.`
			)
		}

		const isCorrectPassword = await bcypt.compare(password, user.password)
		if (!isCorrectPassword) throw APIError.BadRequest('Неверный пароль')

		const isAdmin = await checkIsAdmin(user)
		const response = await this.generateResponse(
			user.userId,
			user.username,
			user.email,
			user.activationLink,
			user.isActivated,
			user.isPassedTest,
			user.avatar,
			user.roleId,
			isAdmin
		)
		return response
	}

	async logoutUsers(refreshToken) {
		if (!refreshToken) throw APIError.UnautorizedError()

		const token = await TokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw APIError.UnautorizedError()

		const userData = TokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await TokenService.findToken(refreshToken)

		if (!userData || !tokenFromDB) throw APIError.UnautorizedError()

		const user = await Users.findOne({ where: { userId: userData.userId } })
		const isAdmin = await checkIsAdmin(user)
		const response = await this.generateResponse(
			user.userId,
			user.username,
			user.email,
			user.activationLink,
			user.isActivated,
			user.isPassedTest,
			user.avatar,
			user.roleId,
			isAdmin
		)
		return response
	}

	async changeUsername(userId, username) {
		const user = await Users.findOne({ where: { userId } })
		if (!user) throw APIError.BadRequest('Пользователь не найден')

		user.username = username
		await user.save()

		return { username: user.username }
	}

	async changePassword(userId, oldPassword, newPassword) {
		const user = await Users.findOne({ where: { userId } })
		if (!user) throw APIError.BadRequest('Пользователь не найден')

		const isCorrectPassword = await bcypt.compare(oldPassword, user.password)
		if (!isCorrectPassword) throw APIError.BadRequest('Неверный старый пароль')

		const hashNewPassword = await bcypt.hash(newPassword, 10)

		user.password = hashNewPassword
		await user.save()

		const isAdmin = await checkIsAdmin(user)
		const response = await this.generateResponse(
			user.userId,
			user.username,
			user.email,
			user.auctivationLink,
			user.isActivated,
			user.isPassedTest,
			user.avatar,
			user.roleId,
			isAdmin
		)
		return response
	}
}

module.exports = new UsersService()
