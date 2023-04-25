import React, { FC, useState } from 'react'
import { IBookingHouse } from '../../models/index'

import { Link } from 'react-router-dom'

const BookingElement: FC<IBookingHouse> = ({
	houseId,
	images,
	name,
	createdAt,
	price,
	status,
}) => {
	const [isShowDetails, setIsShowDetails] = useState(false)
	const toggleShowDetails = () => setIsShowDetails(!isShowDetails)

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
					<h5 className="mb-1">{name}</h5>
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
						<strong>Статус:</strong>
						{status === 'На рассмотрении' ? (
							<span className="p-1 px-2 border border-2 border-warning text-warning rounded">
								На рассмотрении
							</span>
						) : status === 'Отклонено' ? (
							<span className="p-1 px-2 border border-2 border-danger text-danger rounded">
								Отклонено
							</span>
						) : status === 'Забронированно' ? (
							<span className="p-1 px-2 border border-2 border-success text-success rounded">
								Забронированно
							</span>
						) : (
							<span className="p-1 px-2 border border-2 border-dark text-dark rounded">
								Неизвестен
							</span>
						)}
					</h6>
					<div className="d-flex align-items-center gap-2">
						<button
							onClick={() => null}
							className="btn btn-outline-danger d-flex justify-content-center align-items-center gap-2"
						>
							<span>Отменить</span>
						</button>
						<Link
							to={`/houses/${houseId}`}
							className="btn btn-outline-primary d-flex justify-content-center align-items-center gap-2"
						>
							<span>Перейти</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-external-link"
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
								<path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
								<path d="M11 13l9 -9"></path>
								<path d="M15 4h5v5"></path>
							</svg>
						</Link>
					</div>
				</div>
			) : (
				<></>
			)}
		</li>
	)
}

export default BookingElement
