import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { IHouse } from '@src/models/'
import { setIsLoading } from '@src/store/slices/pageSlice'
import HousesService from '@src/services/housesService'
import displaySuccess from '@src/helpers/displaySuccess'

import './style.css'

const HouseAdmin: FC<IHouse> = ({ houseId, images, name }) => {
	const dispatch = useDispatch()

	const [isShowModal, setIsShowModal] = useState(false)
	const [isPermission, setIsPermission] = useState(false)

	const deleteHouse = async (): Promise<void> => {
		try {
			dispatch(setIsLoading(true))
			await HousesService.deleteHouse(houseId).then(response => {
				displaySuccess(dispatch, 'Место отдыха успешно удалено')
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	useEffect(() => {
		if (isPermission) {
			deleteHouse()
			setIsShowModal(false)
			setIsPermission(false)
		}
	}, [isPermission])

	return (
		<>
			<li className="list-group-item list-group-item-action">
				<div className="w-100 d-flex gap-3 align-items-center justify-content-center">
					{images.length > 0 ? (
						<img
							className="list-group-item-image min-h-100"
							src={images[0].image}
							alt=""
						/>
					) : (
						<div className="list-group-item-image"></div>
					)}
					<div className="d-flex justify-content-between align-items-center w-100 flex-sm-row flex-column text-center text-sm-start gap-2">
						<h6 className="m-0 w-100">
							{name.length > 30 ? `${name.substring(0, 30)}...` : name}
						</h6>
						<div className="d-flex justify-content-center align-items-center gap-2 w-100">
							<Link
								to={`edit/${houseId}`}
								className="btn btn-outline-primary w-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-edit"
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
									<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
									<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
									<path d="M16 5l3 3"></path>
								</svg>
							</Link>
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
					Вы действительно хотите удалить данное место отдыха?
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

export default HouseAdmin
