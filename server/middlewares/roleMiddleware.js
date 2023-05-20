const APIError = require('../exceptions/apiExceptions')
const TokenService = require('../services/tokenService')
const { users_roles: UsersRoles, users: Users} = require('../models')

module.exports = function (roles) {
	return async function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}

		try {
			const authorizationHeader = req.headers.authorization
			if (!authorizationHeader) {
				return next(APIError.UnautorizedError())
			}

			const accessToken = authorizationHeader.split(' ')[1]
			if (!accessToken) {
				return next(APIError.UnautorizedError())
			}

			const userData = TokenService.validateAccessToken(accessToken)
			if (!userData) {
				return next(APIError.UnautorizedError())
			}

			const user = await Users.findOne({
				where: {
					email: userData.email
				}
			})

			if (user.isBanned) {
				return next(APIError.BadRequest(
					`Аккаунт заблокирован`
				))
			}

			const userRole = await UsersRoles.findByPk(userData.roleId)
			if (!userRole) {
				return next(APIError.UnautorizedError())
			}

			let hasRole = false
			roles.forEach(role => {
				if (role === userRole.role) {
					hasRole = true
				}
			})

			if (!hasRole) {
				return next(APIError.Forbidden())
			}

			req.user = userData
			next()
		} catch (error) {
			return next(APIError.UnautorizedError())
		}
	}
}
