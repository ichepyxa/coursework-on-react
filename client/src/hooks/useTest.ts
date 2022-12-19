/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/apiUrl'
import displayTroubleConnectionError from '../helpers/displayTroubleConnectionError'
import { IQuestion, ITest } from '../models/index'

export const useTest = () => {
	const dispatch = useDispatch()
	const [test, setTest] = useState<ITest>({} as ITest)
	const [questions, setQuestions] = useState<IQuestion[]>([] as IQuestion[])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getTest = async () => {
		setIsLoading(true)
		try {
			await axios.get<ITest>(`${API_URL}/test`).then(response => {
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

	useEffect(() => {
		getTest()
	}, [])

	return { test, isLoading, questions }
}
