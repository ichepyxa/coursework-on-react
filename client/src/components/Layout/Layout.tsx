import React, { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../constants/apiUrl'
import { IUserResponse } from '../../models'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { setIsAuth, setIsLoading, setUser } from '../../store/slices/userSlice'
import { setNotification } from '../../store/slices/notificationSlice'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Toast from '../Toast/Toast'
import './style.css'
import Loader from '../Loader/Loader'
import Disclamer from '../Disclamer/Disclamer'

const Layout: FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.user)
	const notification = useAppSelector(state => state.notification)

	const checkAuth = async () => {
		dispatch(setIsLoading(true))
		try {
			const response = await axios.get<IUserResponse>(
				`${API_URL}/users/refresh`,
				{
					withCredentials: true,
				}
			)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(setUser(response.data.user))
			dispatch(setIsAuth(true))
			// dispatch(
			// 	setNotification({
			// 		message: 'С возвращением',
			// 		isError: false,
			// 		errors: [],
			// 	})
			// )
		} catch (error: any) {
			dispatch(setNotification({ ...error.response?.data, isError: true }))
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
		}
	}, [])

	return (
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
	)
}

export default Layout
