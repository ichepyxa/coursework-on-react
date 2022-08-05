import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Advice: FC = () => {
	return (
		<section className='advice d-flex justify-content-center align-items-center flex-column'>
			<h2 className='advice__title text-center text-white'>
				Не можете выбрать место отдыха?
			</h2>
			<h5 className='advice__text text-center mt-2 text-white fw-light'>
				Если Вы потерялись в большом количестве предложений и не можете
				определиться - пройдите наш тест, который Вам поможет
			</h5>
			<Link to='/test' className='advice__btn btn btn-primary mt-4'>
				Пройти тест
			</Link>
		</section>
	)
}

export default Advice
