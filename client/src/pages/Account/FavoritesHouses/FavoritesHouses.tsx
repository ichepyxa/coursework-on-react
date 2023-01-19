import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import HousesElement from '@src/components/HousesElement/HousesElement'
import SidebarNavbar from '@src/components/SidebarNavbar/SidebarNavbar'
import { IHouse } from '@src/models/index'
import { useAppDispatch } from '@src/store/hook'
import Loader from '@src/components/Loader/Loader'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import HousesService from '@src/services/housesService'

import './style.css'

const FavoritesHouses: FC = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [houses, setHouses] = useState<IHouse[]>([])

	const getHouses = async () => {
		try {
			setIsLoading(true)
			await HousesService.getFavoritesHouses().then(response => {
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
						Перейти к местам
					</Link>
				</div>
			)}
		</Container>
	)
}

export default FavoritesHouses
