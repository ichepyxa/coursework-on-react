import React, { FC, useEffect, useState } from 'react'
import { IBookingHouses } from '../../models/index'

import { Link } from 'react-router-dom'
import HousesService from '@src/services/housesService'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { useAppDispatch } from '@src/store/hook'

const BookingElementAdmin: FC<IBookingHouses> = ({
	houseId,
	bookingId,
	images,
	name,
	createdAt,
	price,
	status,
	user,
}) => {
	const [isShowDetails, setIsShowDetails] = useState(false)
	const toggleShowDetails = () => setIsShowDetails(!isShowDetails)

	const dispatch = useAppDispatch()
	const [currentStatus, setCurrentStatus] = useState<string>(status)

	const updateBookingStatus = async (newStatus: string): Promise<void> => {
		try {
			const formData = new FormData()
			formData.append('status', newStatus)

			await HousesService.updateBookingStatus(bookingId, formData).then(
				response => {
					if (response.data === undefined || response.data === '') {
						return setCurrentStatus(newStatus)
					}
				}
			)
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		}
	}

	return (
		<li className="list-group-item list-group-item-action d-flex flex-column gap-2">
			<div className="d-flex w-100 justify-content-between align-items-center">
				<div className="d-flex align-items-center gap-2">
					{images.length > 0 ? (
						<img
							className="list-group-item-image"
							src={images[0].image}
							alt={name}
						/>
					) : (
						<div className="list-group-item-image"></div>
					)}
					<h6 className="mb-1">{name}</h6>
				</div>
				<div className="d-flex flex-sm-row flex-column-reverse align-items-sm-center gap-2 gap-sm-4 align-items-end">
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
			{isShowDetails ? (
				<>
					<div className="w-100 mt-2">
						<h6 className="d-flex align-items-center gap-2">
							<strong>Пользователь:</strong>
							<small>{user.username}</small>
						</h6>
						<h6 className="d-flex align-items-center gap-2">
							<strong>Почта:</strong>
							<small>{user.email}</small>
						</h6>
					</div>
					<div className="w-100 d-flex gap-2 flex-column justify-content-center align-items-end">
						<h6 className="d-flex align-items-center gap-2">
							<strong>Дата:</strong>
							<small>
								{new Date(createdAt)
									.toLocaleDateString('ru-RU', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})
									.replace(/\//g, '.')}
							</small>
						</h6>
						<h6 className="d-flex align-items-center gap-2">
							<strong>Текущий статус:</strong>
							{currentStatus === 'На рассмотрении' ? (
								<span className="p-1 px-2 border border-2 border-warning text-warning rounded">
									На рассмотрении
								</span>
							) : currentStatus === 'Отклонено' ? (
								<span className="p-1 px-2 border border-2 border-danger text-danger rounded">
									Отклонено
								</span>
							) : currentStatus === 'Забронированно' ? (
								<span className="p-1 px-2 border border-2 border-success text-success rounded">
									Забронировано
								</span>
							) : (
								<span className="p-1 px-2 border border-2 border-dark text-dark rounded">
									Неизвестен
								</span>
							)}
						</h6>
						<div className="d-flex align-items-center gap-2 flex-wrap">
							<h6>
								<strong>Смена статуса:</strong>
							</h6>
							{currentStatus === 'Отклонено' ? (
								<></>
							) : (
								<button
									onClick={() => updateBookingStatus('Отклонено')}
									className="btn btn-outline-danger d-flex justify-content-center align-items-center gap-2"
								>
									<span>Отклонить</span>
								</button>
							)}
							{currentStatus === 'На рассмотрении' ? (
								<></>
							) : (
								<button
									onClick={() => updateBookingStatus('На рассмотрении')}
									className="btn btn-outline-warning d-flex justify-content-center align-items-center gap-2"
								>
									<span>На рассмотрение</span>
								</button>
							)}
							{currentStatus === 'Забронированно' ? (
								<></>
							) : (
								<button
									onClick={() => updateBookingStatus('Забронированно')}
									className="btn btn-outline-success d-flex justify-content-center align-items-center gap-2"
								>
									<span>Забронировать</span>
								</button>
							)}
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</li>
	)
}

export default BookingElementAdmin
