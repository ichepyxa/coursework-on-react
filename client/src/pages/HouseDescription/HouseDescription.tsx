import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import { IHouse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import Images from './components/Images/Images'

import './style.css'

const HouseDescription: FC = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	const [house, setHouse] = useState<IHouse>({} as IHouse)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouse = async () => {
		setIsLoading(true)
		try {
			await axios
				.get<IHouse>(`${API_URL}/houses/${params.houseId}`)
				.then(response => {
					if (response.data === undefined || response.data === ({} as IHouse)) {
						return setHouse({} as IHouse)
					}

					setHouse(response.data as IHouse)
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouse()
	}, [])

	return (
		<Container as="section" className="description py-4">
			{isLoading ? (
				<Loader />
			) : house !== null && Object.keys(house).length > 0 ? (
				<>
					<h2 className="text-center mt-2 mb-4">
						{house.name
							.toLowerCase()
							.includes(
								house.category
									.substring(0, house.category.length - 1)
									.toLowerCase()
							)
							? ''
							: house.category}{' '}
						{house.name}
					</h2>

					{house.images.length > 0 ? (
						<Images name={house.name} images={house.images} />
					) : (
						<div className="house-description__image"></div>
					)}

					<p className="fs-5">
						<span className="fw-bold text-uppercase">Цена:</span> от{' '}
						{house.price} BYN за дом
					</p>
					<p className="fs-5">
						<span className="fw-bold text-uppercase">Местонахождение:</span>{' '}
						{house.location}
					</p>
					<p className="text-uppercase d-inline-block m-0 fs-5 fw-bold">
						Описание:
					</p>
					{house.description.length > 0 ? (
						<span className="word-break fs-5"> {house.description}</span>
					) : (
						<span className="fs-5"> Описание отсутвует</span>
					)}
					<p className="text-uppercase mt-4 fs-5 font-italic">
						<span className="fw-bold">Дата изменения: </span>
						{new Date(house.updatedAt).toLocaleString()}
					</p>
				</>
			) : (
				<div className="mt-5 d-flex justify-content-center align-items-center flex-column">
					<h4 className="mb-4 text-center">Такой дом не найден.</h4>
					<Link className="btn btn-primary" to="/houses">
						Вернуться к домам
					</Link>
				</div>
			)}
		</Container>
	)
}

export default HouseDescription
