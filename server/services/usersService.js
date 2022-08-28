const {
	users: Users,
	users_favorites_houses: UsersFavoritesHouses,
} = require('../models')
const bcypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const config = require('../config/server_config.json')
const APIError = require('../exceptions/apiExceptions')
const TokenService = require('./tokenService')

class UsersService {
	async generateResponse(
		id,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
		roleId
	) {
		const payload = {
			id,
			username,
			email,
			activationLink,
			isActivated,
			isPassedTest,
			roleId,
		}

		const tokens = TokenService.generateTokens(payload)
		await TokenService.saveRefreshToken(id, tokens.refreshToken)

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

	async registerUsers(username, email, password) {
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

		const response = await this.generateResponse(
			user.id,
			user.username,
			user.email,
			user.activationLink,
			user.isActivated,
			user.isPassedTest,
			user.roleId
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
		if (!isCorrectPassword) {
			throw APIError.BadRequest('Неверный пароль')
		}

		const response = await this.generateResponse(
			user.id,
			user.username,
			user.email,
			user.activationLink,
			user.isActivated,
			user.isPassedTest,
			user.roleId
		)
		return response
	}

	async logoutUsers(refreshToken) {
		if (!refreshToken) {
			throw APIError.UnautorizedError()
		}

		const token = await TokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw APIError.UnautorizedError()
		}

		const userData = TokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await TokenService.findToken(refreshToken)

		if (!userData || !tokenFromDB) {
			throw APIError.UnautorizedError()
		}

		const user = await Users.findOne({ where: { id: userData.id } })
		const response = await this.generateResponse(
			user.id,
			user.username,
			user.email,
			user.activationLink,
			user.isActivated,
			user.isPassedTest,
			user.roleId
		)
		return response
	}

	async getFavoritesHouses(user) {
		if (!user) {
			throw APIError.UnautorizedError()
		}

		const houses = await UsersFavoritesHouses.findAll({
			where: { userid: user.id },
		})
		return houses
	}
}

module.exports = new UsersService()
