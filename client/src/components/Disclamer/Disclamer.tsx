import React, { FC, useEffect, useState } from 'react'
import './style.css'

const Disclamer: FC = () => {
	const [isShow, setIsShow] = useState<boolean>(false)

	const handleCloseDisclamer = () => {
		localStorage.setItem('disclamerIsShow', 'true')
		checkDisclamerIsShow()
	}

	const checkDisclamerIsShow = () => {
		if (localStorage.getItem('disclamerIsShow')) {
			return setIsShow(false)
		}
		setIsShow(true)
	}

	useEffect(() => {
		checkDisclamerIsShow()
	}, [])

	if (!isShow) {
		return <></>
	}

	return (
		<section className="disclamer fixed-bottom bg-white border-top py-3">
			<div className="container d-flex justify-content-between align-items-center">
				<div className="disclamer-content">
					Все материалы взяты с сайта{' '}
					<strong>
						<a
							href="https://www.holiday.by/by"
							className="disclamer-link"
							target="_blank"
							rel="noreferrer"
						>
							Туристический портал Беларуси Holiday.by
						</a>
					</strong>
				</div>
				<div className="disclamer-btn" onClick={handleCloseDisclamer}>
					<i className="disclamer-btn__icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="35px"
							viewBox="0 0 24 24"
							width="35px"
							fill="#000000"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
						</svg>
					</i>
				</div>
			</div>
		</section>
	)
}

export default Disclamer
