import React, { FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Input from '../../../components/Input/Input'
import { API_URL } from '../../../constants/apiUrl'
import displayTroubleConnectionError from '../../../helpers/displayTroubleConnectionError'
import api from '../../../http'
import { useAppDispatch } from '../../../store/hook'
import { setNotification } from '../../../store/slices/notificationSlice'
import { setIsLoading, setUser } from '../../../store/slices/userSlice'

import './style.css'
import { IUserResponse } from '../../../models/index'
import { useNavigate } from 'react-router-dom'
import checkIsValidPassword from '../../../helpers/checkIsValidPassword'

const ChangePassword: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [newPassword, setNewPassword] = useState<string>('')
	const [oldPassword, setOldPassword] = useState<string>('')
	const [isValidOldPassword, setIsValidOldPassword] = useState<boolean | null>(
		null
	)
	const [isValidNewPassword, setIsValidNewPassword] = useState<boolean | null>(
		null
	)

	const handleChangePassword = async (e: any) => {
		e.preventDefault()

		if (isValidNewPassword && isValidOldPassword) {
			dispatch(setIsLoading(true))
			try {
				await api
					.put<IUserResponse>(`${API_URL}/users/changePassword`, {
						oldPassword,
						newPassword,
					})
					.then(response => {
						dispatch(setUser(response.data.user))
						navigate('/account/profile')
						dispatch(
							setNotification({
								message: 'Успешная смена пароля',
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
		if (newPassword.length > 0 || oldPassword.length > 0) {
			setIsValidNewPassword(checkIsValidPassword(newPassword))
			setIsValidOldPassword(checkIsValidPassword(oldPassword))
		}
	}, [newPassword, oldPassword])

	return (
		<Container>
			<Form
				className="form-changeUsername"
				onSubmit={e => handleChangePassword(e)}
			>
				<h2 className="mb-4 fw-normal text-center">
					Изменение пароля пользоваля
				</h2>

				<Input
					controlId="oldPassword"
					type="password"
					placeholder="12345678"
					value={oldPassword}
					onChange={e => setOldPassword(e.target.value)}
					required={true}
					className={
						isValidOldPassword === null
							? ''
							: isValidOldPassword
							? 'is-valid'
							: 'is-invalid'
					}
					label="Старый пароль"
				/>
				<Input
					controlId="newPassword"
					type="password"
					placeholder="12345678"
					value={newPassword}
					onChange={e => setNewPassword(e.target.value)}
					required={true}
					className={
						isValidNewPassword === null
							? ''
							: isValidNewPassword
							? 'is-valid'
							: 'is-invalid'
					}
					label="Новый пароль"
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

export default ChangePassword
