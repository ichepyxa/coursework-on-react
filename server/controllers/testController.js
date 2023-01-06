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

	async sendAnswers(req, res, next) {
		try {
			const answers = await TestService.sendAnswers(req.body.answers)
			res.json(answers)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new TestController()
