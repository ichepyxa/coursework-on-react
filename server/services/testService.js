const {
	test: Test,
	test_answers: TestAnswers,
	test_questions: TestQuestions,
} = require('../models')

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
}

module.exports = new TestService()
