import React, { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import Toast from '../Toast/Toast'
import './style.css'
import Loader from '../Loader/Loader'
import NotOnline from '../../pages/NotOnline/NotOnline'
import { checkAuth } from '../../helpers/checkAuth'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin'

const Layout: FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.user)
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
