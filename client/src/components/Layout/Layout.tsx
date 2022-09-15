import React, { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../constants/apiUrl'
import { IUserResponse } from '../../models'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { setIsAuth, setIsLoading, setUser } from '../../store/slices/userSlice'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Toast from '../Toast/Toast'
import './style.css'
import Loader from '../Loader/Loader'
import Disclamer from '../Disclamer/Disclamer'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import NotOnline from '../../pages/NotOnline/NotOnline'

const Layout: FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.user)
	const notification = useAppSelector(state => state.notification)
	const [onLine, setOnLine] = useState<boolean>(window.clientInformation.onLine)

	const checkAuth = async () => {
		dispatch(setIsLoading(true))
		try {
			await axios
				.get<IUserResponse>(`${API_URL}/users/refresh`, {
					withCredentials: true,
				})
				.then(response => {
					localStorage.setItem('token', response.data.accessToken)
					dispatch(setUser(response.data.user))
					dispatch(setIsAuth(true))
				})
			// dispatch(
			// 	setNotification({
			// 		message: 'С возвращением',
			// 		isError: false,
			// 		errors: [],
			// 	})
			// )
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
		}
	}, [])

	useEffect(() => {
		window.addEventListener('offline', () => setOnLine(false))
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
