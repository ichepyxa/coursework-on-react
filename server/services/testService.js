const {
	test: Test,
	users: Users,
	test_answers: TestAnswers,
	test_questions: TestQuestions,
	test_results: TestResults,
} = require('../models')
const { getHouseById, getHousesWithServices } = require('./housesService')
const APIError = require("../exceptions/apiExceptions");

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

	async getResult(user, answers) {
		if (!user) throw APIError.UnautorizedError()

		await Users.update(
			{
				isPassedTest: true,
			},
			{
				where: {
					userId: user.userId,
				},
			}
		)

		// const answersFromDB = []
		const houses = await getHousesWithServices()
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

			if (filteredHouses.length < 2) {
				filteredHouses = [...oldFilterHouses]
				break
			}

			// answersFromDB.push(answerFromDB)
		}

		const userTestResults = await TestResults.findAll({
			where: {
				userId: user.userId,
			},
		})

		let resultIndex = 0
		let repeatCount = 0
		const randomFilterHouses = []
		while (randomFilterHouses.length < 6) {
			const house =
				filteredHouses[Math.floor(Math.random() * filteredHouses.length)]

			if (repeatCount > 20) break
			if (randomFilterHouses.length === filteredHouses.length) break

			repeatCount++

			if (randomFilterHouses.includes(house)) continue
			if (['Кафе', 'Ресторан', 'Открытая беседка', 'Закрытая беседка'].includes(house.category)) continue

			if (
				!userTestResults ||
				userTestResults.length <= 0 ||
				(resultIndex != 0 && resultIndex == userTestResults.length)
			) {
				const testResult = await TestResults.create({
					houseId: house.houseId,
					userId: user.userId,
				})
			} else {
				await TestResults.update(
					{
						houseId: house.houseId,
						userId: user.userId,
					},
					{
						where: {
							testResultId: userTestResults[resultIndex].testResultId,
						},
					}
				)

				resultIndex++
			}

			randomFilterHouses.push(house)
		}

		if (userTestResults.length > randomFilterHouses.length) {
			for (let i = resultIndex; i < userTestResults.length; i++) {
				if (i < resultIndex) {
					return
				}

				await TestResults.destroy({
					where: {
						testResultId: userTestResults[i].testResultId,
					},
				})
			}
		}

		return randomFilterHouses
	}

	async getSaveResult(user) {
		if (!user) throw APIError.UnautorizedError()

		const userTestResults = await TestResults.findAll({
			where: {
				userId: user.userId,
			},
		})

		let houses = []
		if (userTestResults && userTestResults.length > 0) {
			for (let i = 0; i < userTestResults.length; i++) {
				const house = await getHouseById(userTestResults[i].houseId)

				if (house) {
					houses.push(house)
				}
			}
		}

		return houses
	}
}

module.exports = new TestService()
