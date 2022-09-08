const config = require('../config/server_config.json')
const UsersService = require('../services/usersService')
const { validationResult } = require('express-validator')
const APIError = require('../exceptions/apiExceptions')

function addRefreshTokenInCookie(res, refreshToken) {
	res.cookie('refreshToken', refreshToken, {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	})
}

class UsersController {
	async getAllUsers(req, res, next) {
		try {
			const users = await UsersService.getAllUsers()
			res.json(users)
		} catch (error) {
			next(error)
		}
	}

	async activateUser(req, res, next) {
		try {
			if (!req.user) {
				throw new APIError.UnautorizedError()
			}

			const activationLink = req.params.link
			await UsersService.activateUser(activationLink)

			return res.redirect(config.CLIENT_URL)
		} catch (error) {
			next(error)
		}
	}

	async registrationUsers(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				throw APIError.BadRequest(
					'Ошибка при регистрации аккаунта',
					errors.array()
				)
			}

			const { username, email, password } = req.body
			const user = await UsersService.registrationUsers(
				username,
				email,
				password
			)

			addRefreshTokenInCookie(res, user.refreshToken)
			res.json(user)
		} catch (error) {
			next(error)
		}
	}

	async loginUsers(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				throw APIError.BadRequest('Ошибка при входе в аккаунт', errors.array())
			}

			const { email, password } = req.body
			const user = await UsersService.loginUsers(email, password)

			addRefreshTokenInCookie(res, user.refreshToken)
			res.json(user)
		} catch (error) {
			next(error)
		}
	}

	async logoutUsers(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await UsersService.logoutUsers(refreshToken)

			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const tokenData = await UsersService.refresh(refreshToken)

			addRefreshTokenInCookie(res, tokenData.refreshToken)
			res.json(tokenData)
		} catch (error) {
			next(error)
		}
	}

	async getFavoritesHouses(req, res, next) {
		try {
			const houses = await UsersService.getFavoritesHouses(req.user)
			console.log(houses)
			res.json(houses)
		} catch (error) {
			next(error)
		}
	}

	async createFavoritesHouses(req, res, next) {
		try {
			const house = await UsersService.createFavoritesHouses(
				req.user,
				req.body.houseId
			)
			res.json(house)
		} catch (error) {
			next(error)
		}
	}

	async deleteFavoritesHouses(req, res, next) {
		try {
			const house = await UsersService.deleteFavoritesHouses(
				req.user,
				req.params.houseId
			)
			res.json(house)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UsersController()
