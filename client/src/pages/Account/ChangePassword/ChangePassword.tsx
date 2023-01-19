import { FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import Input from '@src/components/Input/Input'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { useAppDispatch } from '@src/store/hook'
import { setUser } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import checkIsValidPassword from '@src/helpers/checkIsValidPassword'
import displaySuccess from '@src/helpers/displaySuccess'
import UsersService from '@src/services/usersService'

import './style.css'

type ChangePasswordProps = {
	backPath: string
}

const ChangePassword: FC<ChangePasswordProps> = ({ backPath }) => {
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

	const handleChangePassword = async (e: any): Promise<void> => {
		e.preventDefault()

		if (isValidNewPassword && isValidOldPassword) {
			try {
				dispatch(setIsLoading(true))
				await UsersService.changePassword({
					oldPassword,
					newPassword,
				}).then(response => {
					dispatch(setUser(response.data.user))
					navigate(backPath)
					displaySuccess(dispatch, 'Успешная смена пароля')
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
				<h2 className="mb-4 fw-normal text-center">Изменение пароля</h2>

				<Input
					controlId="oldPassword"
					type="password"
					placeholder="Kr3D5uJDo"
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
					placeholder="Kr3D5uJDo"
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
