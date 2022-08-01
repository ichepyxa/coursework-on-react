const config = require('../config/server_config.json')
const UsersService = require('../services/usersService')
const { validationResult } = require('express-validator')
const APIError = require('../exceptions/apiExceptions')

class UsersController {
	async getAllUsers(req, res, next) {
		try {
			const users = await UsersService.getAllUsers()
			res.json(users)
		} catch (error) {
			next(error)
		}
	}

	// async getUsersById(req, res, next) {
	// 	try {
	// 		const user = await UsersService.getUsersById(req.params.id)
	// 		res.json(user)
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	async activateUser(req, res, next) {
		try {
			const activationLink = req.params.link
			await UsersService.activateUser(activationLink)

			return res.redirect(config.CLIENT_URL)
		} catch (error) {
			next(error)
		}
	}

	async registerUsers(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				throw APIError.BadRequest(
					'Ошибка при регистрации аккаунта',
					errors.array()
				)
			}

			const { username, email, password } = req.body
			const user = await UsersService.registerUsers(username, email, password)

			res.cookie('refreshToken', user.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
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

			res.cookie('refreshToken', user.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
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

			res.cookie('refreshToken', tokenData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.json(tokenData)
		} catch (error) {
			next(error)
		}
	}

	// async updateUsers(req, res, next) {
	// 	try {
	// 		const updateUser = await UsersService.updateUsers(req.params.id, req.body)
	// 		res.json(updateUser)
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	// async deleteUsers(req, res, next) {
	// 	try {
	// 		const deleteUser = await UsersService.deleteUsers(req.params.id)
	// 		res.json(deleteUser)
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
}

module.exports = new UsersController()
