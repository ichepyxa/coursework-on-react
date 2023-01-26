import ITimeStamps from './ITimeStamps'

export default interface IAnswer extends ITimeStamps {
	answerId: number
	answer: string
	questionId: number
	services: string
	type: string
}
