import IQuestion from './IQuestion'
import ITimeStamps from './ITimeStamps'

export default interface ITest extends ITimeStamps {
	testId: number
	testName: string
	questions: IQuestion[]
}
