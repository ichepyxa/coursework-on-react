const APIError = require('../exceptions/apiExceptions')

module.exports = function (err, req, res, next) {
	console.log(err)

	if (err instanceof APIError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors })
	}

	if (err.message !== '') {
		return res.status(500).json({ message: err.message })
	}

	return res.status(500).json({ message: 'Непредвиденная ошибка' })
}
