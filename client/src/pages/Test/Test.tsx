import { AxiosResponse } from 'axios'
import { FC, useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import HousesElement from '../../components/HousesElement/HousesElement'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { titleName } from '../../constants/titleName'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import api from '../../http'
import { IHouse, IQuestion, ITest, IUserAnswer } from '../../models'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'
import Questions from './components/Questions'
import './style.css'

const Test: FC = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTestResult, setIsTestResult] = useState<boolean>(false)
	const [testResult, setTestResult] = useState<IHouse[]>([] as IHouse[])
	const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([])
	const [currentSelectRadio, setCurrentSelectRadio] =
		useState<HTMLInputElement | null>(null)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
	const [isLastQuestionTest, setIsLastQuestionTest] = useState<boolean>(false)
	const [test, setTest] = useState<ITest>({} as ITest)
	const [questions, setQuestions] = useState<IQuestion[]>([] as IQuestion[])

	const sendAnswers = async () => {
		setIsLoading(true)
		try {
			await api
				.post<IQuestion[], AxiosResponse<IHouse[]>>(`${API_URL}/test`, {
					answers: userAnswers,
				})
				.then(response => {
					if (!response.data || response.data === ([] as IHouse[])) {
						dispatch(
							setNotification({
								message: 'Что-то пошло не так',
								errors: [],
								isError: true,
							})
						)

						return
					}

					setIsTestResult(true)
					setTestResult(response.data)
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	const getTest = async () => {
		setIsLoading(true)
		try {
			await api.get<ITest>(`${API_URL}/test`).then(response => {
				if (response.data === undefined || response.data === ({} as ITest)) {
					setQuestions([] as IQuestion[])
					return setTest({} as ITest)
				}

				setQuestions(response.data.questions)
				setTest(response.data as ITest)
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	const submitQuestion = () => {
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

	return (
		<>
			<DocumentTitle title={`${titleName} тест`} />
			{isTestResult ? (
				<div className="py-5 overflow-hidden">
					<h2 className="text-center">Результаты</h2>
					<HousesElement houses={testResult} />
				</div>
			) : (
				<div className="d-flex justify-content-center align-items-center flex-column gap-4 main-question px-3 py-5">
					{isLoading ? (
						<Loader />
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
			)}
		</>
	)
}

export default Test
