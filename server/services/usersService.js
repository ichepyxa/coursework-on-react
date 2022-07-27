const { Users, Users_Favorites_Houses, Users_Roles } = require('../models')
const bcypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const config = require('../config/server_config.json')

class UsersService {
	async getAllUsers() {
		const users = await Users.findAll()
		return users
	}

	async getUsersById(id) {
		if (!id) throw new Error('Не указан ID')

		const user = await Users.findByPk(id)
		return user
	}

	async activateUser(activationLink) {
		if (!activationLink) throw new Error('Не корректная ссылка')

		const user = await Users.findOne({ where: { activationLink } })
		if (!user) throw new Error('Не корректная ссылка')

		user.isActivated = true
		await user.save()
	}

	async createUsers(user) {
		if (!user) throw new Error('Не верный формат')

		const activationLink = uuid.v4()
		const hashPassword = await bcypt.hash(user.password, 10)

		await mailService.sendActivationAccountMail(
			user.email,
			`${config.API_URL}/api/users/activate/${activationLink}`
		)

		const newUser = await Users.create({
			...user,
			password: hashPassword,
			activationLink,
		})
		return newUser
	}

	async updateUsers(id, user) {
		if (!id) throw new Error('Не указан ID')
		if (!user) throw new Error('Не верный формат')

		const hashPassword = await bcypt.hash(user.password, 10)

		await Users.update({ ...user, password: hashPassword }, { where: { id } })
		return await Users.findByPk(id)
	}

	async deleteUsers(id) {
		if (!id) throw new Error('Не указан ID')

		const deleteUser = await Users.destroy({ where: { id } })
		return deleteUser
	}
}

module.exports = new UsersService()
