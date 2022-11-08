import React, { FC } from 'react'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'
import './style.css'

const Test: FC = () => {
	const answers = [
		{
			_id: 1,
			answer: 'gfdsgsdg',
		},
		{
			_id: 2,
			answer: 'ksamdkmgk smgoidm igmakl mgkdm kmask gmkasmk gmamgk ',
		},
		{
			_id: 3,
			answer:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam qui eveniet minima nobis ipsum ratione praesentium, quae sequi culpa placeat consectetur ipsa sapiente blanditiis deserunt illum earum odio odit dolorum!',
		},
	]

	return (
		<>
			<DocumentTitle title={`${titleName} тест`} />
			<div className="d-flex justify-content-center align-items-center flex-column gap-4 main-question px-3 py-5">
				<h2 className="text-center">
					<strong>Вопрос:</strong> Lorem ipsum dolor sit amet consectetur
					adipisicing elit.
				</h2>
				<div className="list-group list-group-checkable d-grid gap-3 border-0 w-100">
					{answers &&
						answers.map((answer, index) => (
							<>
								<input
									className="list-group-item-check pe-none"
									type="radio"
									name="listGroupCheckableRadios"
									id={`listGroupCheckableRadios${answer._id}`}
									value=""
								/>
								<label
									className="list-group-item w-100 rounded-3 py-3"
									htmlFor={`listGroupCheckableRadios${answer._id}`}
								>
									<strong className="small">Ответ №{index + 1}: </strong>
									{answer.answer}
								</label>
							</>
						))}
				</div>
			</div>
		</>
	)
}

export default Test
