import React, { FC, useEffect, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../constants/apiUrl'
import { IUser, IUserResponse } from '../../models'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { setIsAuth, setIsLoading, setUser } from '../../store/slices/userSlice'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import './style.css'

const Layout: FC = () => {
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(state => state.user.isLoading)
	const [isNotificationShow, setIsNotificationShow] = useState(true)

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
		} catch (error: any) {
			console.log(error.response?.data?.message)
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
