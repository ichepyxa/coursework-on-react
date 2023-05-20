const APIError = require('../exceptions/apiExceptions')
const TokenService = require('../services/tokenService')
const {users_roles: UsersRoles, users: Users} = require("../models");

module.exports = async function (req, res, next) {
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

    req.user = userData
    next()
  } catch (error) {
    return next(APIError.UnautorizedError())
  }
}
