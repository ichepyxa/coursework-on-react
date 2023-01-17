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

	async getResult(answers) {
		const houses = await getHousesWithServices()
		const answersFromDB = []
		let filteredHouses = [...houses]
		let days = 1

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

			const oldFilterHouses = [...filteredHouses]
			switch (answerFromDB.type) {
				case 'oblast':
					const oblast = services[0]

					filteredHouses = filteredHouses.filter(item =>
						oblast ? item.location.includes(oblast) : item
					)
					break
				case 'days':
					days = +services[0]
					break
				case 'price':
					const price = +services[0] / days

					filteredHouses = filteredHouses.filter(item => item.price <= price)
					break
				case 'inclusion':
					for (const service of services) {
						filteredHouses = filteredHouses.filter(item =>
							item.services.includes(service.trim())
						)
					}
					break
				case 'exception':
					for (const service of services) {
						filteredHouses = filteredHouses.filter(
							item => !item.services.includes(service.trim())
						)
					}
					break
				default:
					break
			}

			if (filteredHouses.length < 6) {
				filteredHouses = [...oldFilterHouses]
				break
			}

			answersFromDB.push(answerFromDB)
		}

		const randomFilterHouses = []
		while (randomFilterHouses.length < 6) {
			const house =
				filteredHouses[Math.floor(Math.random() * filteredHouses.length)]
			if (randomFilterHouses.includes(house)) continue

			randomFilterHouses.push(house)
		}

		return randomFilterHouses
	}
}

module.exports = new TestService()
