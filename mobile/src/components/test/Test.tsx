import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import IHouse from '../../models/IHouse'
import IQuestion from '../../models/IQuestion'
import ITest from '../../models/ITest'
import { IUserAnswer } from '../../models/IUserAnswer'
import TestService from '../../services/testService'
import Loader from '../loader/Loader'
import Questions from '../questions/Questions'
import TestResult from '../test-result/TestResult'

export default function Test() {
	const [isTestResult, setIsTestResult] = useState(false)
	const [testResult, setTestResult] = useState<IHouse[]>([] as IHouse[])
	const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([])
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
				setQuestions(response.data.questions)
				setTest(response.data as ITest)
				setIsLoading(false)
			})
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	const submitQuestion = (answerId): void => {
		if (!answerId) {
			return
		}

		setUserAnswers(
			(state: IUserAnswer[]) =>
				(state = [
					...state,
					{
						questionId: questions[currentQuestionIndex].questionId,
						answerId,
					},
				])
		)

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
		<View style={styles.test}>
			{isTestResult ? (
				<View style={styles.result}>
					<Text style={styles.title}>Результаты</Text>
					<TestResult houses={testResult} />
				</View>
			) : (
				<View>
					{isLoading ? (
						<Loader isLoading={isLoading} />
					) : (
						<>
							<Questions
								questions={questions}
								currentQuestionIndex={currentQuestionIndex}
								submitQuestion={submitQuestion}
							/>
						</>
					)}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'mt-semibold',
	},
	test: {
		paddingHorizontal: 30,
		paddingTop: 10,
		marginBottom: 100,
	},
})
