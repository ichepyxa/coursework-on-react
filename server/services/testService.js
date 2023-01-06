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
		let filteredHouses = houses
		const answersFromDB = []

		for (const answer of answers) {
			const answerFromDB = await TestAnswers.findOne({
				where: {
					answerId: answer.answerId,
				},
			})

			if (!answerFromDB) {
				continue
			}

			let services = answerFromDB.services
				? answerFromDB.services.split(',')
				: ''
			switch (answerFromDB.type) {
				case 'oblast':
					const oblast = answerFromDB.answer.split(', ')[1]

					filteredHouses = filteredHouses.filter(item =>
						item.location.includes(oblast)
					)
					break
				case 'add':
					for (const service of services) {
						filteredHouses = filteredHouses.filter(item =>
							item.services.includes(service)
						)
					}
					break
				case 'remove':
					console.log(services)
					for (const service of services) {
						filteredHouses = filteredHouses.filter(
							item => !item.services.includes(service)
						)
					}
					break
				default:
					break
			}

			answersFromDB.push(answerFromDB)
		}

		return filteredHouses
	}
}

module.exports = new TestService()
