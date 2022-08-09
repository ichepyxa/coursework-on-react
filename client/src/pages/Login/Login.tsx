import React, { FC, useState } from 'react'
import AuthService from '../../sevices/authService'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'
import { setIsAuth, setIsLoading, setUser } from '../../store/slices/userSlice'

const Login: FC = () => {
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleLogin = async (email: string, password: string) => {
		dispatch(setIsLoading(true))
		try {
			const response = await AuthService.login(email, password)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(setUser(response.data.user))
			dispatch(setIsAuth(true))
			dispatch(
				setNotification({
					message: 'Успешный вход',
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
			<button onClick={() => handleLogin(email, password)}>Login</button>
		</div>
	)
}

export default Login
