const TestService = require('../services/testService')

class TestController {
	async getTest(req, res, next) {
		try {
			const test = await TestService.getTest()
			res.json(test)
		} catch (error) {
			next(error)
		}
	}

	async getResult(req, res, next) {
		try {
			const answers = await TestService.getResult(req.user, req.body.answers)
			res.json(answers)
		} catch (error) {
			next(error)
		}
	}

	async getSaveResult(req, res, next) {
		try {
			const answers = await TestService.getSaveResult(req.user)
			res.json(answers)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new TestController()
