import { FC, Fragment } from 'react'
import { IQuestion } from '../../../models'

type QuestionsProps = {
	questions: IQuestion[]
	currentQuestionIndex: number
	setCurrentSelectRadio: CallableFunction
}

const Questions: FC<QuestionsProps> = ({
	questions,
	currentQuestionIndex,
	setCurrentSelectRadio,
}) => {
	return (
		<>
			{questions &&
				questions.length > 0 &&
				currentQuestionIndex !== questions.length && (
					<>
						<h2 className="text-center">
							<strong>Вопрос №{currentQuestionIndex + 1}:</strong>{' '}
							{questions[currentQuestionIndex].question}
						</h2>
						<div className="list-group list-group-checkable d-grid gap-3 border-0 w-100">
							{questions[currentQuestionIndex].answers &&
								questions[currentQuestionIndex].answers.map((answer, index) => (
									<Fragment key={index}>
										<input
											className="list-group-item-check pe-none"
											type="radio"
											name="listGroupCheckableRadios"
											id={`${answer.answerId}`}
											value=""
											onChange={e => setCurrentSelectRadio(e.target)}
										/>
										<label
											className="list-group-item w-100 rounded-3 py-3"
											htmlFor={`${answer.answerId}`}
										>
											{/* <strong className="small">Ответ №{index + 1}: </strong> */}
											{answer.answer}
										</label>
									</Fragment>
								))}
						</div>
					</>
				)}
		</>
	)
}

export default Questions
