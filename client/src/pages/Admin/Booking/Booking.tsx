import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import Loader from '../../../components/Loader/Loader'
import SidebarNavbarAdmin from '../../../components/SidebarNavbarAdmin/SidebarNavbarAdmin'
import { titleName } from '../../../constants/titleName'
import BookingElementAdmin from '@src/components/BookingElementAdmin/BookingElementAdmin'
import { IBookingHouses } from '@src/models'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import HousesService from '@src/services/housesService'
import { useAppDispatch } from '@src/store/hook'

const Booking: FC = () => {
	const pageHrefPath = 'admin/users'
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [houses, setHouses] = useState<IBookingHouses[]>([])

	const getResults = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await HousesService.getAllBookingHouses().then(response => {
				if (
					response.data === undefined ||
					response.data === ([] as IBookingHouses[])
				) {
					return setHouses([] as IBookingHouses[])
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
			<DocumentTitle title={`${titleName} бронирование`} />

			<SidebarNavbarAdmin />
			<div className="mt-lg-4 w-100 position-relative">
				<h2 className="text-center mb-4 word-break">Бронирование</h2>

				{isLoading ? (
					<Loader />
				) : houses !== ([] as IBookingHouses[]) && houses.length > 0 ? (
					<div className="list-group mt-3">
						{houses.map(house => (
							<BookingElementAdmin {...house} />
						))}
					</div>
				) : (
					<>
						<h4 className="mt-5 text-center">Ничего не найдено.</h4>
						<h6 className="text-center">
							Не один пользователь, не забронировал место отдыха.
						</h6>
					</>
				)}
			</div>
		</Container>
	)
}

export default Booking
