import IAnswer from './IAnswer'
import ITimeStamps from './ITimeStamps'

export default interface IQuestion extends ITimeStamps {
	questionId: number
	question: string
	answers: IAnswer[]
	testId: number
}
