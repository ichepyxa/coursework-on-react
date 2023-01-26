import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native'
import IQuestion from '../../models/IQuestion'

type QuestionsProps = {
	questions: IQuestion[]
	currentQuestionIndex: number
	submitQuestion: CallableFunction
}

export default function Questions({
	questions,
	currentQuestionIndex,
	submitQuestion,
}: QuestionsProps) {
	const onPress = (answerId: number) => {
		submitQuestion(answerId)
	}

	return (
		<>
			{questions &&
				questions.length > 0 &&
				currentQuestionIndex !== questions.length && (
					<>
						<Text style={styles.questionTitle}>
							<Text style={styles.strong}>
								Вопрос №{currentQuestionIndex + 1}:
							</Text>{' '}
							{questions[currentQuestionIndex].question}
						</Text>
						<ScrollView style={styles.answers}>
							{questions[currentQuestionIndex].answers &&
								questions[currentQuestionIndex].answers.map((answer, index) => (
									<TouchableNativeFeedback
										key={index}
										onPress={() => onPress(answer.answerId)}
									>
										<Text style={styles.answerBtn}>{answer.answer}</Text>
									</TouchableNativeFeedback>
								))}
						</ScrollView>
					</>
				)}
		</>
	)
}

const styles = StyleSheet.create({
	questionTitle: {
		textAlign: 'center',
		fontSize: 20,
		marginVertical: 10,
	},
	strong: {
		fontFamily: 'mt-semibold',
	},
	answers: {
		paddingHorizontal: 5,
		marginBottom: 15,
	},
	answerBtn: {
		textAlign: 'center',
		fontFamily: 'mt-medium',
		backgroundColor: '#1D90ED',
		color: '#fff',
		width: '100%',
		fontSize: 18,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 7,
		marginTop: 15,
	},
})
