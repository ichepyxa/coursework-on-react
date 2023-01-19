import { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@src/store/hook'
import Toast from '@src/components/Toast/Toast'
import Loader from '@src/components/Loader/Loader'
import NotOnline from '@src/pages/NotOnline/NotOnline'
import { checkAuth } from '@src/helpers/checkAuth'
import NavbarAdmin from '@src/components/NavbarAdmin/NavbarAdmin'

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
			<NavbarAdmin />
			<main className="main" id="main">
				{isLoading ? <Loader /> : <Outlet />}
			</main>
			{notification.message ? (
				<Toast
					message={notification.message}
					isError={notification.isError}
					isVisible={true}
				/>
			) : (
				<></>
			)}
		</>
	) : (
		<NotOnline />
	)
}

export default Layout
