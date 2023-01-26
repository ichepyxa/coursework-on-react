const jwt = require('jsonwebtoken')
const config = require('../config/server_config')
const { tokens: Tokens } = require('../models')

class TokenService {
	validateAccessToken(accessToken) {
		try {
			const userData = jwt.verify(accessToken, config.JWT_ACCESS_SECRET_KEY)
			return userData
		} catch (error) {
			return null
		}
	}

	validateRefreshToken(refreshToken) {
		try {
			const userData = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY)
			return userData
		} catch (error) {
			return null
		}
	}

	generateTokens(payload) {
		const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET_KEY, {
			expiresIn: '15d', //temporarily 15d, original 15m
		})

		const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET_KEY, {
			expiresIn: '15d', //temporarily 15d, original 3d
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	async saveRefreshToken(userId, refreshToken) {
		const tokenData = await Tokens.findOne({ where: { userId } })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}

		const token = await Tokens.create({ refreshToken, userId })
		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await Tokens.destroy({ where: { refreshToken } })
		return tokenData
	}

	async findToken(refreshToken) {
		const tokenData = await Tokens.findOne({ where: { refreshToken } })
		return tokenData
	}
}

module.exports = new TokenService()
