import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container } from 'react-bootstrap'
import House from '../../components/House/House'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { IHouse, IHouseResponse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'
import Search from './components/Search/Search'
import Pagination from './components/Pagination/Pagination'

const Houses: FC<{ page: string | null }> = ({ page = '1' }) => {
	const dispatch = useAppDispatch()
	const [houses, setHouses] = useState<IHouse[]>([])
	const [countPage, setCountPage] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouses = async () => {
		setIsLoading(true)
		try {
			const response = await axios.get<IHouseResponse>(
				`${API_URL}/houses?page=${page}`
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
			return {} as IHouseResponse
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouses().then(data => {
			if (data === undefined || data.houses === []) {
				return setHouses([] as IHouse[])
			}

			setCountPage(data.count)
			setHouses(data.houses as IHouse[])
		})
	}, [])

	return (
		<Container className="py-3">
			<h2 className="text-center mt-4">Места отдыха</h2>
			<Search />

			{isLoading ? (
				<Loader />
			) : houses.length > 0 ? (
				<>
					<div className="houses d-md-flex align-items-center justify-content-around flex-wrap mb-5">
						{houses.map((house: IHouse) => (
							<House key={house.houseId} {...house} />
						))}
					</div>
					<Pagination countPage={countPage} />
				</>
			) : (
				<>
					<h4 className="mt-5 text-center">
						К сожалению, по вашему запросу ничего не найдено.
					</h4>
					<h6 className="text-center">
						Попробуйте уменьшить количество параметров подбора.
					</h6>
				</>
			)}
		</Container>
	)
}

export default Houses
