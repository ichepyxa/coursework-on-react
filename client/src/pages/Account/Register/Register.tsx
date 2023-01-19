import { FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import Input from '@src/components/Input/Input'
import checkIsValidEmail from '@src/helpers/checkIsValidEmail'
import checkIsValidPassword from '@src/helpers/checkIsValidPassword'
import checkIsValidUsername from '@src/helpers/checkIsValidUsername'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import AuthService from '@src/services/authService'
import { useAppDispatch } from '@src/store/hook'
import { setIsAuth, setUser } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import { titleName } from '@src/constants/titleName'
import displaySuccess from '@src/helpers/displaySuccess'

const Register: FC = () => {
	const dispatch = useAppDispatch()
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isValidUsername, setIsValidUsername] = useState<boolean | null>(null)
	const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
	const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null)

	const handleRegistration = async (e: any): Promise<void> => {
		e.preventDefault()

		if (isValidUsername && isValidEmail && isValidPassword) {
			try {
				dispatch(setIsLoading(true))
				await AuthService.registration(username, email, password).then(
					response => {
						localStorage.setItem('token', response.data.accessToken)
						dispatch(setUser(response.data.user))
						dispatch(setIsAuth(true))
						displaySuccess(dispatch, 'Успешная регистрация')
					}
				)
			} catch (error: any) {
				displayTroubleConnectionError(dispatch, error)
			} finally {
				dispatch(setIsLoading(false))
			}
		}
	}

	useEffect(() => {
		if (username.length > 0 || email.length > 0 || password.length > 0) {
			setIsValidUsername(checkIsValidUsername(username))
			setIsValidEmail(checkIsValidEmail(email))
			setIsValidPassword(checkIsValidPassword(password))
		}
	}, [email, password, username])

	return (
		<Container>
			<DocumentTitle title={`${titleName} регистрация`} />
			<Form className="form-login" onSubmit={e => handleRegistration(e)}>
				<h2 className="mb-4 fw-normal text-center">Регистрация</h2>

				<Input
					controlId="username"
					type="text"
					placeholder="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					required={true}
					className={
						isValidUsername === null
							? ''
							: isValidUsername
							? 'is-valid'
							: 'is-invalid'
					}
					label="Имя пользователя"
				/>
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
					Зарегестрироваться
				</Button>
				<p className="small text-center text-gray-soft">
					У вас уже есть аккаунт? <Link to="/account/login">Войти</Link>
				</p>
			</Form>
		</Container>
	)
}

export default Register
