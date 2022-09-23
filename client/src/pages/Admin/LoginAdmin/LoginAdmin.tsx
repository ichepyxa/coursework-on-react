import React, { FC, useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Input from '../../../components/Input/Input'
import { titleName } from '../../../constants/titleName'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import checkIsValidPassword from '../../../helpers/checkIsValidPassword'
import checkIsValidEmail from '../../../helpers/checkIsValidEmail'
import { useAppDispatch } from '../../../store/hook'
import {
	setIsAuth,
	setIsLoading,
	setUser,
} from '../../../store/slices/userSlice'
import AuthService from '../../../sevices/authService'
import { setNotification } from '../../../store/slices/notificationSlice'
import displayTroubleConnectionError from '../../../helpers/displayTroubleConnectionError'

import './style.css'

const LoginAdmin: FC = () => {
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
	const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null)

	const handleLogin = async (e: any) => {
		e.preventDefault()

		if (isValidEmail && isValidPassword) {
			dispatch(setIsLoading(true))
			try {
				await AuthService.login(email, password).then(response => {
					if (!response.data.user.isAdmin) {
						dispatch(
							setNotification({
								message: 'Неверный логин или пароль',
								errors: [],
								isError: true,
							})
						)
						return
					}

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
				})
			} catch (error: any) {
				displayTroubleConnectionError(dispatch, error)
			} finally {
				dispatch(setIsLoading(false))
			}
		}
	}

	useEffect(() => {
		if (email.length > 0 || password.length > 0) {
			setIsValidEmail(checkIsValidEmail(email))
			setIsValidPassword(checkIsValidPassword(password))
		}
	}, [email, password])

	return (
		<Container>
			<DocumentTitle title={`${titleName} вход`} />
			<Form className="form-login admin" onSubmit={e => handleLogin(e)}>
				<h2 className="mb-4 fw-normal text-center">Админ панель</h2>

				<Input
					controlId="email"
					type="email"
					placeholder="name@example.com"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required={true}
					className={
						isValidEmail === null
							? ''
							: isValidEmail
							? 'is-valid'
							: 'is-invalid'
					}
					label="Адрес электронной почты"
				/>
				<Input
					controlId="password"
					type="password"
					placeholder="12345678"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required={true}
					className={
						isValidEmail === null
							? ''
							: isValidPassword
							? 'is-valid'
							: 'is-invalid'
					}
					label="Пароль"
				/>
				<Button
					type="submit"
					variant="primary"
					className="mt-3 w-100 btn btn-lg"
				>
					Войти
				</Button>
				<p className="small text-center text-gray-soft">
					Забыли пароль?{' '}
					<Link to="/admin/restorePassword">Восстановить пароль</Link>
				</p>
			</Form>
		</Container>
	)
}

export default LoginAdmin
