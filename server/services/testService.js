const {
	test: Test,
	test_answers: TestAnswers,
	test_questions: TestQuestions,
} = require('../models')
const { getHousesWithServices } = require('./housesService')

class TestService {
	async getTest() {
		const test = await Test.findOne({
			include: [
				{
					model: TestQuestions,
					as: 'questions',
					include: [
						{
							model: TestAnswers,
							as: 'answers',
						},
					],
				},
			],
		})
		return test
	}

	async sendAnswers(answers) {
		const houses = await getHousesWithServices()

		return houses.filter(
			item => !item.services.includes('баня', 'мангал/барбекю', 'баня/сауна')
		)
	}
}

module.exports = new TestService()
