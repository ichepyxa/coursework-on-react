import React, { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import './style.css'

const Layout: FC = () => {
	const [isLoading, setIsLoading] = useState(false)

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
						{/* <div className='spinner-border' role='status'>
							<span className='visually-hidden'>Загрузка...</span>
						</div> */}
					</div>
				) : (
					<Outlet />
				)}
			</main>
			<Footer />
		</>
	)
}

export default Layout
