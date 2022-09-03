import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { IHouse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'
import Images from './components/Images/Images'

import './style.css'

const Description: FC = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	const [house, setHouse] = useState<IHouse>({} as IHouse)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouse = async () => {
		setIsLoading(true)
		try {
			const response = await axios.get<IHouse>(
				`${API_URL}/houses/${params.houseId}`
			)

			return response.data
		} catch (error: any) {
			if (error.response.status === 0) {
				dispatch(
					setNotification({
						message: 'Проблемы с соединением',
						errors: [],
						isError: true,
					})
				)
				return
			}

			dispatch(setNotification({ ...error.response?.data, isError: true }))
			return {} as IHouse
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouse().then(data => {
			if (data === undefined || data === ({} as IHouse)) {
				return setHouse({} as IHouse)
			}

			setHouse(data as IHouse)
		})
	}, [])

	return (
		<Container as="section" className="description py-4">
			{isLoading ? (
				<Loader />
			) : house !== null && Object.keys(house).length > 0 ? (
				<>
					<h2 className="text-center mt-2 mb-4">
						{house.category} {house.name}
					</h2>
					{house.images.length > 0 ? (
						<Images name={house.name} images={house.images} />
					) : (
						<div className="house-description__image"></div>
					)}

					<div className="house-description__info d-lg-flex justify-content-between">
						<p>
							<strong>Местонахождение:</strong> {house.location}
						</p>
						<p>
							<strong>Цена:</strong> от {house.price} BYN
						</p>
					</div>
					<h6 className="d-inline-block">
						<strong>Описание:</strong>
					</h6>
					{house.description.length > 0 ? (
						<span className="word-break"> {house.description}</span>
					) : (
						<span> Описание отсутвует</span>
					)}
					<p className="mt-4 font-italic">
						<strong>Дата изменения: </strong>
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

export default Description
