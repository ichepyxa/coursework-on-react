import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'

export default function Test() {
	const [isTestResult, setIsTestResult] = useState(false)
	const [testResult, setTestResult] = useState<IHouse[]>([] as IHouse[])
	const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([])
	const [currentSelectRadio, setCurrentSelectRadio] =
		useState<HTMLInputElement | null>(null)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [isLastQuestionTest, setIsLastQuestionTest] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [test, setTest] = useState<ITest>({} as ITest)
	const [questions, setQuestions] = useState<IQuestion[]>([] as IQuestion[])

	const sendAnswers = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await TestService.sendAnswers({
				answers: userAnswers,
			}).then(response => {
				setIsTestResult(true)
				setTestResult(response.data)
				setIsLoading(false)
			})
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	const getTest = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await TestService.getTest().then(response => {
				if (response.data === undefined || response.data === ({} as ITest)) {
					setQuestions([] as IQuestion[])
					return setTest({} as ITest)
				}

				setQuestions(response.data.questions)
				setTest(response.data as ITest)
			})
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	const submitQuestion = (): void => {
		if (!currentSelectRadio) {
			return
		}

		setUserAnswers(
			(state: IUserAnswer[]) =>
				(state = [
					...state,
					{
						questionId: questions[currentQuestionIndex].questionId,
						answerId: +currentSelectRadio.id,
					},
				])
		)

		currentSelectRadio.checked = false
		setCurrentSelectRadio(null)
		setCurrentQuestionIndex(state => (state += 1))

		if (currentQuestionIndex === questions.length - 1) {
			setIsLastQuestionTest(true)
		}
	}

	useEffect(() => {
		getTest()
	}, [])

	useEffect(() => {
		if (isLastQuestionTest) {
			sendAnswers()
		}
	}, [isLastQuestionTest])

	return isTestResult ? (
		<div className="py-5 overflow-hidden">
			<h2 className="text-center">Результаты</h2>
			<HousesElement houses={testResult} />
		</div>
	) : (
		<div className="d-flex justify-content-center align-items-center flex-column gap-4 main-question px-3 py-5">
			{isLoading ? (
				<Loader isLoading={isLoading} />
			) : (
				<>
					<Questions
						questions={questions}
						currentQuestionIndex={currentQuestionIndex}
						setCurrentSelectRadio={setCurrentSelectRadio}
					/>
					<button
						className="mt-2 btn btn-outline-primary d-block px-5 py-2"
						onClick={submitQuestion}
						disabled={currentSelectRadio ? undefined : true}
					>
						{currentQuestionIndex === questions.length - 1
							? 'Завершить'
							: 'Далее'}
					</button>
				</>
			)}
		</div>
	)
}
