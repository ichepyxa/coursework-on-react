import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { IHouse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'

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
			) : Object.keys(house).length > 0 ? (
				<>
					{house.images.length > 0 ? (
						<img src={house.images[0].image} alt={house.name} />
					) : (
						<div className="house-item__image"></div>
					)}

					<h2>{house.name}</h2>
					<span>{house.location}</span>
					<span>{house.price}</span>
					<hr />
					{house.description.length > 0 ? (
						<p>{house.description}</p>
					) : (
						<p>Описание отсутвует</p>
					)}
					<em>
						Дата изменения:{' '}
						<strong>{new Date(house.updatedAt).toLocaleString()}</strong>
					</em>
				</>
			) : (
				<>
					<h4 className="mt-5 text-center">Что-то пошло не так.</h4>
				</>
			)}
		</Container>
	)
}

export default Description
