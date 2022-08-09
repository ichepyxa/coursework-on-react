import React, { FC, useState } from 'react'
import AuthService from '../../sevices/authService'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'
import { setIsAuth, setIsLoading, setUser } from '../../store/slices/userSlice'

const Register: FC = () => {
	const dispatch = useAppDispatch()
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleRegistration = async (
		username: string,
		email: string,
		password: string
	) => {
		dispatch(setIsLoading(true))
		try {
			const response = await AuthService.registration(username, email, password)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(setUser(response.data.user))
			dispatch(setIsAuth(true))
			dispatch(
				setNotification({
					message: 'Успешная регистрация',
					isError: false,
					errors: [],
				})
			)
		} catch (error: any) {
			dispatch(setNotification({ ...error.response?.data, isError: true }))
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	return (
		<div>
			<input
				type="text"
				placeholder="username"
				value={username}
				onChange={e => setUsername(e.target.value)}
				required
			/>
			<input
				type="email"
				placeholder="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>
			<button onClick={() => handleRegistration(username, email, password)}>
				Login
			</button>
		</div>
	)
}

export default Register
