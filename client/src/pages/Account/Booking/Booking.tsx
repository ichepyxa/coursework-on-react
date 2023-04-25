import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SidebarNavbar from '../../../components/SidebarNavbar/SidebarNavbar'
import { IBookingHouse } from '../../../models/index'
import BookingElement from '../../../components/BookingElement/BookingElement'
import { useAppDispatch } from '@src/store/hook'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import Loader from '@src/components/Loader/Loader'

import './style.css'
import { Link } from 'react-router-dom'
import HousesService from '@src/services/housesService'

const Booking: FC = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [houses, setHouses] = useState<IBookingHouse[]>([])

	const getResults = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await HousesService.getBookingHouses().then(response => {
				if (
					response.data === undefined ||
					response.data === ([] as IBookingHouse[])
				) {
					return setHouses([] as IBookingHouse[])
				}

				setHouses(response.data)
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect((): void => {
		getResults()
	}, [])

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<SidebarNavbar />
			{isLoading ? (
				<Loader />
			) : houses !== ([] as IBookingHouse[]) && houses.length > 0 ? (
				<div className="mt-lg-4 w-100">
					<h2 className="text-center">Забронированные места отдыха</h2>
					<div className="list-group mt-3">
						{houses.map(house => (
							<BookingElement {...house} />
						))}
					</div>
				</div>
			) : (
				<div className="w-100 d-flex justify-content-center align-items-center flex-column">
					<h2 className="mb-4 mt-lg-4 text-center mw-50 fs-4">
						Вы не бронировали места отдаха
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

export default Booking
