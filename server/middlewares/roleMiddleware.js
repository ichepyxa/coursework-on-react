const APIError = require('../exceptions/apiExceptions')
const TokenService = require('../services/tokenService')
const { Users_Roles } = require('../models')

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

			const userRole = await Users_Roles.findByPk(userData.roleId)
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
				return next(APIError.UnautorizedError())
			}

			req.user = userData
			next()
		} catch (error) {
			return next(APIError.UnautorizedError())
		}
	}
}