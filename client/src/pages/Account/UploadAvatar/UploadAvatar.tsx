import React, { FC, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import UploadInput from '@src/components/UploadInput/UploadInput'
import { API_DOMAIN } from '@src/constants/apiUrl'
import { imagesType } from '@src/constants/fileImagesType'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { useAuth } from '@src/hooks/useAuth'
import { useAppDispatch } from '@src/store/hook'
import { setAvatar } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import displayError from '@src/helpers/displayError'
import UsersService from '@src/services/usersService'
import displaySuccess from '@src/helpers/displaySuccess'

import './style.css'
import {titleName} from "@src/constants/titleName";
import DocumentTitle from "react-document-title";

const UploadAvatar: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { avatar } = useAuth()
	const [userAvatar, setUserAvatar] = useState<string | undefined>(
		`${API_DOMAIN}${avatar}`
	)

	const onChange = (e: any, setValue: CallableFunction) => {
		if (!imagesType.includes(e.target.files[0].type)) {
			displayError(dispatch, 'Вы выбрали не фото')
			return setValue('')
		}

		setValue(URL.createObjectURL(e.target.files[0]))
	}

	const onUpload = async (e: any): Promise<void> => {
		e.preventDefault()

		if (avatar && userAvatar?.includes(avatar)) {
			return displayError(dispatch, 'Выберите фото')
		}

		const formData = new FormData()
		formData.append('avatar', e.target.querySelector('input').files[0])

		try {
			dispatch(setIsLoading(true))
			await UsersService.uploadAvatar(formData).then(response => {
				dispatch(setAvatar(response.data.avatar))
				navigate('/account/profile')
				displaySuccess(dispatch, 'Успешная смена фото')
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	const onDelete = async (e: any): Promise<void> => {
		e.preventDefault()

		if (!avatar) {
			return displayError(dispatch, 'У вас нету фото')
		}

		try {
			dispatch(setIsLoading(true))
			await UsersService.deleteAvatar().then(response => {
				dispatch(setAvatar(response.data.avatar))
				navigate('/account/profile')
				displaySuccess(dispatch, 'Фото удалено')
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
			<DocumentTitle title={`${titleName} загрузка фото`} />
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
