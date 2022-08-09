import React, { FC } from 'react'
import './style.css'

const Loader: FC = () => {
	return (
		<div
			id="loader"
			className="d-flex justify-content-center align-items-center w-100"
		>
			<div className="loader-content">
				<div className="loader-content__first"></div>
				<div className="loader-content__second"></div>
				<div className="loader-content__third"></div>
			</div>
		</div>
	)
}

export default Loader
