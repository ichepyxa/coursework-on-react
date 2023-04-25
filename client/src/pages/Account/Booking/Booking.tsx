import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SidebarNavbar from '../../../components/SidebarNavbar/SidebarNavbar'
import { IBookingHouse } from '../../../models/index'
import BookingElement from '../../../components/BookingElement/BookingElement'
import { useAppDispatch } from '@src/store/hook'
import TestService from '@src/services/testService'
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

	// const houses: IBookingHouse[] = [
	// 	{
	// 		houseId: 1,
	// 		name: 'fsag',
	// 		category: 'fdisaknjриалтвыфь штоЛьлладвыф',
	// 		location: 'gds',
	// 		price: 3244,
	// 		description: 'gsgfs',
	// 		images: [
	// 			{
	// 				imageId: 1,
	// 				image:
	// 					'https://www.holiday.by/files/houses/thumbnails/houses_gallery_preview/b0e6762b4c53b77487b1bd65c3cf8ca2.jpeg',
	// 			},
	// 		],
	// 		createdAt: '2022-10-26 21:38:15',
	// 		updatedAt: 'sagasggs',
	// 		isFavorite: false,
	// 		status: 'Забронированно',
	// 	},
	// 	{
	// 		houseId: 2,
	// 		name: 'fsag',
	// 		category: 'fdisaknjриалтвыфь штоЛьлладвыф',
	// 		location: 'gds',
	// 		price: 3244,
	// 		description: 'gsgfs',
	// 		images: [],
	// 		createdAt: '2022-10-26 21:38:15',
	// 		updatedAt: 'sagasggs',
	// 		isFavorite: false,
	// 		status: 'Отклонено',
	// 	},
	// 	{
	// 		houseId: 3,
	// 		name: 'fsag',
	// 		category: 'fdisaknjриалтвыфь штоЛьлладвыф',
	// 		location: 'gds',
	// 		price: 3244,
	// 		description: 'gsgfs',
	// 		images: [],
	// 		createdAt: '2022-10-26 21:38:15',
	// 		updatedAt: 'sagasggs',
	// 		isFavorite: false,
	// 		status: 'На рассмотрении',
	// 	},
	// 	{
	// 		houseId: 4,
	// 		name: 'fsag',
	// 		category: 'fdisaknjриалтвыфь штоЛьлладвыф',
	// 		location: 'gds',
	// 		price: 3244,
	// 		description: 'gsgfs',
	// 		images: [],
	// 		createdAt: '2022-10-26 21:38:15',
	// 		updatedAt: 'sagasggs',
	// 		isFavorite: false,
	// 		status: 'пквапа',
	// 	},
	// ]

	const [isShowDetails, setIsShowDetails] = useState(false)
	const toggleShowDetails = () => setIsShowDetails(!isShowDetails)

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<SidebarNavbar />
			<div className="mt-lg-4 w-100">
				<h2 className="text-center">Забронированные места отдыха</h2>
				<div className="list-group mt-3">
					{houses.map(house => (
						<BookingElement {...house} />
					))}
				</div>
			</div>
		</Container>
	)
}

export default Booking
