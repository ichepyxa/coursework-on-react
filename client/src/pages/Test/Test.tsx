import React, { FC, SetStateAction, useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'
import { IQuestion, IUserAnswer } from '../../models'
import './style.css'

const Test: FC = () => {
	const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([])
	const [currentSelectRadio, setCurrentSelectRadio] =
		useState<HTMLInputElement | null>(null)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [questionJSX, setQuestionJSX] = useState<React.ReactNode>(null)
	const questions: IQuestion[] = [
		{
			questionId: 1,
			title: 'gfdsgsgs',
			answers: [
				{
					answerId: 1,
					answer: 'gfdsgsdg',
				},
				{
					answerId: 2,
					answer: 'ksamdkmgk smgoidm igmakl mgkdm kmask gmkasmk gmamgk ',
				},
				{
					answerId: 3,
					answer:
						'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam qui eveniet minima nobis ipsum ratione praesentium, quae sequi culpa placeat consectetur ipsa sapiente blanditiis deserunt illum earum odio odit dolorum!',
				},
			],
		},
		{
			questionId: 2,
			title: 'gfsdgdsafg',
			answers: [
				{
					answerId: 1,
					answer: '986475u49iopekrfdsofut hgienk',
				},
				{
					answerId: 2,
					answer: '239r8thfginm;kol, sfdkgsnidmkdlsm giue',
				},
				{
					answerId: 3,
					answer:
						'23irjifgosdml, gniodklsram skgdsjf mgvjsdfehtgnei aklndigujsd gjdbasijkf madjinogsmasoklflmsk',
				},
			],
		},
	]

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
	}

	const generateQuestionJSX = () => {
		return (
			<>
				{questions &&
					questions.length > 0 &&
					currentQuestionIndex !== questions.length && (
						<>
							<h2 className="text-center">
								<strong>Вопрос №{currentQuestionIndex + 1}:</strong>{' '}
								{questions[currentQuestionIndex].title}
							</h2>
							<div className="list-group list-group-checkable d-grid gap-3 border-0 w-100">
								{questions[currentQuestionIndex].answers &&
									questions[currentQuestionIndex].answers.map(
										(answer, index) => (
											<React.Fragment key={index}>
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
													<strong className="small">
														Ответ №{index + 1}:{' '}
													</strong>
													{answer.answer}
												</label>
											</React.Fragment>
										)
									)}
							</div>
						</>
					)}
			</>
		)
	}

	useEffect(() => {
		setQuestionJSX(generateQuestionJSX())
	}, [currentQuestionIndex])

	return (
		<>
			<DocumentTitle title={`${titleName} тест`} />
			<div className="d-flex justify-content-center align-items-center flex-column gap-4 main-question px-3 py-5">
				{questionJSX}
				<button
					className="mt-2 btn btn-outline-primary d-block px-5 py-2"
					onClick={submitQuestion}
					disabled={currentSelectRadio ? undefined : true}
				>
					{currentQuestionIndex === questions.length - 1
						? 'Завершить'
						: 'Далее'}
				</button>
			</div>
		</>
	)
}

export default Test
