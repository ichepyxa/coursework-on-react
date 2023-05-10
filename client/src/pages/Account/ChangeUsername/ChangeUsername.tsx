import React, { FC, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import Input from '@src/components/Input/Input'
import checkIsValidUsername from '@src/helpers/checkIsValidUsername'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { useAppDispatch } from '@src/store/hook'
import { useAuth } from '@src/hooks/useAuth'
import { setUser } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import UsersService from '@src/services/usersService'
import displaySuccess from '@src/helpers/displaySuccess'

import './style.css'
import {titleName} from "@src/constants/titleName";
import DocumentTitle from "react-document-title";

const ChangeUsername: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const user = useAuth()
	const [username, setUsername] = useState<string>(user.username || '')
	const [isValidUsername, setIsValidUsername] = useState<boolean | null>(null)

	const handleChangeUsername = async (e: any): Promise<void> => {
		e.preventDefault()

		if (isValidUsername) {
			try {
				dispatch(setIsLoading(true))
				await UsersService.changeUsername(username).then(response => {
					dispatch(setUser({ ...user, username: response.data.username }))
					navigate('/account/profile')
					displaySuccess(dispatch, 'Успешная смена имени')
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
			<DocumentTitle title={`${titleName} изменение имени пользователя`} />

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
