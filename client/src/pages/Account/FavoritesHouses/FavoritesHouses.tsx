import api from '../../../http'
import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import HousesElement from '../../../components/HousesElement/HousesElement'
import SidebarNavbar from '../../../components/SidebarNavbar/SidebarNavbar'
import { API_URL } from '../../../constants/apiUrl'
import { IHouse, IHouseFavoritesResponse } from '../../../models/index'
import { useAppDispatch } from '../../../store/hook'
import Loader from '../../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import displayTroubleConnectionError from '../../../helpers/displayTroubleConnectionError'

import './style.css'

const FavoritesHouses: FC = () => {
	const dispatch = useAppDispatch()
	const [houses, setHouses] = useState<IHouse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouses = async () => {
		setIsLoading(true)
		try {
			await api
				.get<IHouseFavoritesResponse>(`${API_URL}/houses/favoritesHouses`)
				.then(response => {
					if (
						response.data.houses === undefined ||
						response.data.houses === ([] as IHouse[])
					) {
						return setHouses([] as IHouse[])
					}

					setHouses(response.data.houses)
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
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
			) : houses !== ([] as IHouse[]) && houses.length > 0 ? (
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

export default FavoritesHouses
