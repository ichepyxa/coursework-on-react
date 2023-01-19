import { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '@src/components/Footer/Footer'
import Navbar from '@src/components/Navbar/Navbar'
import Toast from '@src/components/Toast/Toast'
import Loader from '@src/components/Loader/Loader'
import Disclamer from '@src/components/Disclamer/Disclamer'
import NotOnline from '@src/pages/NotOnline/NotOnline'
import { useAppSelector, useAppDispatch } from '@src/store/hook'
import { checkAuth } from '@src/helpers/checkAuth'

import './style.css'

const Layout: FC = () => {
	const dispatch = useAppDispatch()

	const { isLoading } = useAppSelector(state => state.page)
	const notification = useAppSelector(state => state.notification)
	const [onLine, setOnLine] = useState<boolean>(window.clientInformation.onLine)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth(dispatch)
		}
	}, [])

	useEffect(() => {
		window.addEventListener('offline', () => setOnLine(false))
		window.addEventListener('online', () => setOnLine(true))
	}, [])

	return onLine ? (
		<>
			<Navbar />
			<main className="main" id="main">
				{isLoading ? <Loader /> : <Outlet />}
			</main>
			<Footer />
			{notification.message ? (
				<Toast
					message={notification.message}
					isError={notification.isError}
					isVisible={true}
				/>
			) : (
				<></>
			)}
			<Disclamer />
		</>
	) : (
		<NotOnline />
	)
}

export default Layout
