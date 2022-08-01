import React, { FC, useEffect, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import './style.css'

const Layout: FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isNotificationShow, setIsNotificationShow] = useState(true)

	return (
		<>
			<Navbar />
			<main className='main' id='main'>
				{isLoading ? (
					<div
						id='loader'
						className='d-flex justify-content-center align-items-center w-100'
					>
						<div className='loader-content'>
							<div className='loader-content__first'></div>
							<div className='loader-content__second'></div>
							<div className='loader-content__third'></div>
						</div>
					</div>
				) : (
					<Outlet />
				)}
			</main>
			<Footer />
			<Toast
				show={isNotificationShow}
				onClose={() => setIsNotificationShow(!isNotificationShow)}
				delay={5000}
				bg={'success' || 'danger'}
				autohide
			>
				<Toast.Body className='text-white'>
					Woohoo, you're reading this text in a Toast!
				</Toast.Body>
			</Toast>
		</>
	)
}

export default Layout
