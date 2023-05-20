import {FC, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import {IUserAdmin} from '@src/models'
import { API_DOMAIN } from '@src/constants/apiUrl'

import './style.css'
import UsersService from "@src/services/usersService";

const UserAdmin: FC<IUserAdmin> = ({
	username,
	avatar,
	email,
	isPassedTest,
	isActivated,
	isBanned
}) => {
	const [showIsBanned, setShowIsBanned] = useState(isBanned)
	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowDetails, setIsShowDetails] = useState(false)
	const [isPermission, setIsPermission] = useState(false)

	const toggleBanned = async (): Promise<void> => {
		if (!email) {
			return
		}

		await UsersService.toggleBanned(email).then(response => {
			if (response.status > 300) {
				return
			}

			setShowIsBanned((state) => !state)
		})
	}

	const toggleShowDetails = () => setIsShowDetails(!isShowDetails)

	useEffect(() => {
		if (isPermission) {
			toggleBanned()
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
					<div className="d-flex justify-content-between align-items-center w-100 flex-row text-center text-sm-start gap-2">
						<h6 className="m-0">{username}</h6>
						<div className="d-flex justify-content-center align-items-center gap-2">
							<button
								className="border-0 bg-transparent cursor-pointer w-100"
								onClick={toggleShowDetails}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style={{
										transition: 'transform 0.3s ease-in-out',
										transform: isShowDetails ? 'rotate(180deg)' : '',
									}}
									width="25"
									height="25"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<polyline points="6 9 12 15 18 9"></polyline>
								</svg>
							</button>
						</div>
					</div>
				</div>
				{isShowDetails ? (
					<div className="px-2 py-3">
						<h6 className="word-break">
							<span className="fw-semibold">Почта:</span> {email}
						</h6>
						<h6 className="word-break">
							<span className="fw-semibold">Проходил тест:</span>{' '}
							{isPassedTest ? 'да' : 'нет'}
						</h6>
						<h6 className="word-break">
							<span className="fw-semibold">Подтвержден:</span>{' '}
							{isActivated ? 'да' : 'нет'}
						</h6>
						<button
							onClick={() => setIsShowModal(true)}
							className={`btn d-block ms-auto ${showIsBanned ? "btn-success" : "btn-danger"}`}
						>
							{showIsBanned ? "Разблокировать" : "Заблокировать"}
						</button>
					</div>
				) : (
					<></>
				)}
			</li>
			<Modal show={isShowModal} onHide={() => setIsShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Подтверждение</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Вы действительно хотите {showIsBanned ? "разблокировать" : "заблокировать"} данного пользователя?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={() => setIsShowModal(false)}>
						Нет
					</Button>
					<Button variant="primary" onClick={() => setIsPermission(true)}>
						Да, {showIsBanned ? "разблокировать" : "заблокировать"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default UserAdmin
