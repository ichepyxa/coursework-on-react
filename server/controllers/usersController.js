const config = require('../config/server_config.json')
const UsersService = require('../services/usersService')

class UsersController {
	async getAllUsers(req, res, next) {
		try {
			const users = await UsersService.getAllUsers()
			res.json(users)
		} catch (error) {
			console.log(error)
		}
	}

	async getUsersById(req, res, next) {
		try {
			const user = await UsersService.getUsersById(req.params.id)
			res.json(user)
		} catch (error) {
			console.log(error)
		}
	}

	async activateUser(req, res, next) {
		try {
			const activationLink = req.params.link
			await UsersService.activateUser(activationLink)

			return res.redirect(config.CLIENT_URL)
		} catch (error) {
			console.log(error)
		}
	}

	async createUsers(req, res, next) {
		try {
			const newUser = await UsersService.createUsers(req.body)
			res.json(newUser)
		} catch (error) {
			console.log(error)
		}
	}

	async updateUsers(req, res, next) {
		try {
			const updateUser = await UsersService.updateUsers(req.params.id, req.body)
			res.json(updateUser)
		} catch (error) {
			console.log(error)
		}
	}

	async deleteUsers(req, res, next) {
		try {
			const deleteUser = await UsersService.deleteUsers(req.params.id)
			res.json(deleteUser)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new UsersController()
