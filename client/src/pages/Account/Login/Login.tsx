import React, { FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import checkIsValidEmail from '../../../helpers/checkIsValidEmail'
import checkIsValidPassword from '../../../helpers/checkIsValidPassword'
import AuthService from '../../../sevices/authService'
import { useAppDispatch } from '../../../store/hook'
import { setNotification } from '../../../store/slices/notificationSlice'
import {
	setIsAuth,
	setIsLoading,
	setUser,
} from '../../../store/slices/userSlice'
import Input from '../../../components/Input/Input'
import './style.css'
import displayTroubleConnectionError from '../../../helpers/displayTroubleConnectionError'
import { titleName } from '../../../constants/titleName'
import DocumentTitle from 'react-document-title'

const Login: FC = () => {
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
	const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null)

	useEffect(() => {
		if (email.length > 0 || password.length > 0) {
			setIsValidEmail(checkIsValidEmail(email))
			setIsValidPassword(checkIsValidPassword(password))
		}
	}, [email, password])

	const handleLogin = async (e: any) => {
		e.preventDefault()

		if (isValidEmail && isValidPassword) {
			dispatch(setIsLoading(true))
			try {
				await AuthService.login(email, password).then(response => {
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

	return (
		<Container>
			<DocumentTitle title={`${titleName} вход`} />
			<Form className="form-login" onSubmit={e => handleLogin(e)}>
				<h2 className="mb-4 fw-normal text-center">Вход</h2>

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
					У вас ещё нету аккаунта?{' '}
					<Link to="/account/registration">Зарегестрироваться</Link>
				</p>
			</Form>
		</Container>
	)
}

export default Login
