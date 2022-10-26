import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import api from '../../http'
import { IUserAdmin } from '../../models/index'
import { setNotification } from '../../store/slices/notificationSlice'
import { setIsLoading } from '../../store/slices/userSlice'

import './style.css'
import { API_DOMAIN } from '../../constants/apiUrl'

const UserAdmin: FC<IUserAdmin> = ({ userId, avatar, email }) => {
	const dispatch = useDispatch()
	const [isShowModal, setIsShowModal] = useState(false)
	const [isPermission, setIsPermission] = useState(false)

	const deleteSight = async () => {
		dispatch(setIsLoading(true))
		try {
			await api.delete<void>(`/users/${userId}`).then(response => {
				dispatch(
					setNotification({
						message: 'Пользователь успешно удален',
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

	useEffect(() => {
		if (isPermission) {
			deleteSight()
			setIsShowModal(false)
			setIsPermission(false)
		}
	}, [isPermission])

	return (
		<>
			<li className="list-group-item list-group-item-action">
				<div className="w-100 d-flex gap-3 align-items-center justify-content-center">
					{avatar ? (
						<img
							className="rounded-circle list-group-item-image min-h-100"
							src={`${API_DOMAIN}${avatar}`}
							alt=""
						/>
					) : (
						<div className="list-group-item-image"></div>
					)}
					<div className="d-flex justify-content-between align-items-center w-100 flex-sm-row flex-column text-center text-sm-start gap-2">
						<h6 className="m-0 w-100">
							{email}
							{/* {username.length > 30
								? `${username.substring(0, 30)}...`
								: username} */}
						</h6>
						<div className="d-flex justify-content-center align-items-center gap-2 w-100">
							<button
								onClick={() => setIsShowModal(true)}
								className="btn btn-outline-danger w-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-trash"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<line x1="4" y1="7" x2="20" y2="7"></line>
									<line x1="10" y1="11" x2="10" y2="17"></line>
									<line x1="14" y1="11" x2="14" y2="17"></line>
									<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
									<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</li>
			<Modal show={isShowModal} onHide={() => setIsShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Подтверждение</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Вы действительно хотите удалить данного пользователя?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={() => setIsShowModal(false)}>
						Нет
					</Button>
					<Button variant="primary" onClick={() => setIsPermission(true)}>
						Да, удалить
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default UserAdmin
