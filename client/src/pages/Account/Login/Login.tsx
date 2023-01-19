import { FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import checkIsValidEmail from '@src/helpers/checkIsValidEmail'
import checkIsValidPassword from '@src/helpers/checkIsValidPassword'
import AuthService from '@src/services/authService'
import { useAppDispatch } from '@src/store/hook'
import { setIsAuth, setUser } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import Input from '@src/components/Input/Input'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { titleName } from '@src/constants/titleName'
import displaySuccess from '@src/helpers/displaySuccess'

import './style.css'

const Login: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
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
					localStorage.setItem('token', response.data.accessToken)
					dispatch(setUser(response.data.user))
					dispatch(setIsAuth(true))
					displaySuccess(dispatch, 'Успешный вход')

					if (response.data.user.isAdmin) {
						navigate('/admin')
					}
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
