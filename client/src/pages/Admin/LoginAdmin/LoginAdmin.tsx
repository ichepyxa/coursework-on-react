import { FC, useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'

import Input from '@src/components/Input/Input'
import { titleName } from '@src/constants/titleName'
import checkIsValidPassword from '@src/helpers/checkIsValidPassword'
import checkIsValidEmail from '@src/helpers/checkIsValidEmail'
import { useAppDispatch } from '@src/store/hook'
import { setIsAuth, setUser } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import AuthService from '@src/services/authService'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import displayError from '@src/helpers/displayError'
import displaySuccess from '@src/helpers/displaySuccess'

import './style.css'

const LoginAdmin: FC = () => {
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
	const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null)

	const handleLogin = async (e: any): Promise<void> => {
		e.preventDefault()

		if (isValidEmail && isValidPassword) {
			try {
				dispatch(setIsLoading(true))
				await AuthService.login(email, password).then(response => {
					if (!response.data.user.isAdmin) {
						displayError(dispatch, 'Неверный логин или пароль')
						return
					}

					localStorage.setItem('token', response.data.accessToken)
					dispatch(setUser(response.data.user))
					dispatch(setIsAuth(true))
					displaySuccess(dispatch, 'Успешный вход')
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
