import api from '../../http'
import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import HousesElement from '../../components/HousesElement/HousesElement'
import SidebarNavbar from '../../components/SidebarNavbar/SidebarNavbar'
import { API_URL } from '../../constants/apiUrl'
import { IHouse, IHouseFavoritesResponse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'

import './style.css'

const Favorites: FC = () => {
	const dispatch = useAppDispatch()
	const [houses, setHouses] = useState<IHouse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouses = async () => {
		setIsLoading(true)
		try {
			await api
				.get<IHouseFavoritesResponse>(`${API_URL}/users/favoritesHouses`)
				.then(async response => {
					response.data.houses.forEach(async item => {
						await axios
							.get<IHouse>(`${API_URL}/houses/${item.houseId}`)
							.then(async item => {
								console.log(item)
								await setHouses(oldHouses => [...oldHouses, item.data])
								console.log(houses)
							})
					})
				})
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
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouses()
	}, [])

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<SidebarNavbar />
			{isLoading ? (
				<Loader />
			) : houses.length > 0 ? (
				<div className="mt-lg-4 w-100">
					<h2 className="text-center">Избранные места отдыха</h2>
					<HousesElement houses={houses} />
				</div>
			) : (
				<div className="w-100 d-flex justify-content-center align-items-center flex-column">
					<h2 className="mb-4 mt-lg-4 text-center mw-50">
						У вас нет избранных мест отдыха
					</h2>
					<Link
						to="/houses"
						className="houses__btn btn btn-outline-primary px-4"
					>
						Перейти к домам
					</Link>
				</div>
			)}
		</Container>
	)
}

export default Favorites
