import { FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Input from '../../../components/Input/Input'
import { API_URL } from '../../../constants/apiUrl'
import checkIsValidUsername from '../../../helpers/checkIsValidUsername'
import displayTroubleConnectionError from '../../../helpers/displayTroubleConnectionError'
import api from '../../../http'
import { useAppDispatch } from '../../../store/hook'
import { useAuth } from '../../../hooks/useAuth'
import { setNotification } from '../../../store/slices/notificationSlice'
import { setIsLoading, setUser } from '../../../store/slices/userSlice'

import './style.css'
import { IChangeUsernameResponse } from '../../../models/index'
import { useNavigate } from 'react-router-dom'

const ChangeUsername: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const user = useAuth()
	const [username, setUsername] = useState<string>(user.username || '')
	const [isValidUsername, setIsValidUsername] = useState<boolean | null>(null)

	const handleChangeUsername = async (e: any) => {
		e.preventDefault()

		if (isValidUsername) {
			dispatch(setIsLoading(true))
			try {
				await api
					.put<IChangeUsernameResponse>(`${API_URL}/users/changeUsername`, {
						username,
					})
					.then(response => {
						dispatch(setUser({ ...user, username: response.data.username }))
						navigate('/account/profile')
						dispatch(
							setNotification({
								message: 'Успешная смена имени',
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
		if (username.length > 0) {
			setIsValidUsername(checkIsValidUsername(username))
		}
	}, [username])

	return (
		<Container>
			<Form
				className="form-changeUsername"
				onSubmit={e => handleChangeUsername(e)}
			>
				<h2 className="mb-4 fw-normal text-center">
					Изменение имени пользоваля
				</h2>

				<Input
					controlId="username"
					type="text"
					placeholder="name"
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
					label="Новое имя пользователя"
				/>
				<Button
					type="submit"
					variant="primary"
					className="mt-3 w-100 btn btn-lg"
				>
					Изменить
				</Button>
			</Form>
		</Container>
	)
}

export default ChangeUsername
