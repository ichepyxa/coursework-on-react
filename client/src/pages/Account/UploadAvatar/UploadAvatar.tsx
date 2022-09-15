import React, { FC } from 'react'
import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UploadInput from '../../../components/UploadInput/UploadInput'
import { API_DOMAIN } from '../../../constants/apiUrl'
import { imagesType } from '../../../constants/fileImagesType'
import displayTroubleConnectionError from '../../../helpers/displayTroubleConnectionError'
import { useAuth } from '../../../hooks/useAuth'
import api from '../../../http'
import { IAvatar } from '../../../models'
import { useAppDispatch } from '../../../store/hook'
import { setNotification } from '../../../store/slices/notificationSlice'
import { setIsLoading, setAvatar } from '../../../store/slices/userSlice'

import './style.css'

const UploadAvatar: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { avatar } = useAuth()
	const [userAvatar, setUserAvatar] = useState<string | undefined>(
		`${API_DOMAIN}${avatar}`
	)

	const displayError = (message: string) => {
		dispatch(
			setNotification({
				message,
				isError: true,
				errors: [],
			})
		)
	}

	const onChange = (e: any, setValue: CallableFunction) => {
		if (!imagesType.includes(e.target.files[0].type)) {
			displayError('Вы выбрали не фото')
			return setValue('')
		}

		setValue(URL.createObjectURL(e.target.files[0]))
	}

	const onUpload = async (e: any) => {
		e.preventDefault()

		if (!userAvatar) {
			return displayError('Выберите фото')
		}

		const formData = new FormData()
		formData.append('avatar', e.target.querySelector('input').files[0])

		dispatch(setIsLoading(true))
		try {
			await api
				.post<IAvatar>('/users/uploadAvatar', formData)
				.then(response => {
					dispatch(setAvatar(response.data.avatar))
					dispatch(
						setNotification({
							message: 'Успешная смена фото',
							isError: false,
							errors: [],
						})
					)
					navigate('/account/profile')
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	const onDelete = async (e: any) => {
		e.preventDefault()

		if (!avatar) {
			return displayError('У вас нету фото')
		}

		dispatch(setIsLoading(true))
		try {
			await api.delete<IAvatar>('/users/deleteAvatar').then(response => {
				dispatch(setAvatar(response.data.avatar))
				dispatch(
					setNotification({
						message: 'Фото удалено',
						isError: false,
						errors: [],
					})
				)
				navigate('/account/profile')
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	return (
		<Container
			as="section"
			className="upload-avatar d-flex flex-column justify-content-center align-items-center"
		>
			<h2 className="mb-4 text-center">Загрузка фото</h2>
			<img
				className="avatar border-primary border border-2 mb-3 rounded-circle"
				src={
					userAvatar && userAvatar !== API_DOMAIN
						? userAvatar
						: '/images/no-user-bg-img.png'
				}
				alt="userImg"
			/>
			<Form
				className="d-flex flex-column mb-5 justify-content-center"
				onSubmit={e => onUpload(e)}
			>
				<UploadInput
					className="mb-3 mx-auto"
					label=""
					setValue={setUserAvatar}
					onChange={onChange}
				/>
				<button className="mb-3 btn btn-outline-primary">Загрузить</button>
				{avatar ? (
					<button className="btn btn-outline-danger" onClick={e => onDelete(e)}>
						Удалить фото
					</button>
				) : (
					<></>
				)}
			</Form>
		</Container>
	)
}

export default UploadAvatar
