import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container } from 'react-bootstrap'
import House from '../../components/House/House'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { IHouse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import { setNotification } from '../../store/slices/notificationSlice'

const Houses: FC<{ page: string | null }> = ({ page = '1' }) => {
	const dispatch = useAppDispatch()
	const [houses, setHouses] = useState<IHouse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouses = async () => {
		setIsLoading(true)
		try {
			const response = await axios.get<IHouse[]>(
				`${API_URL}/houses?page=${page}`
			)

			return response.data
		} catch (error: any) {
			if (error.response.status === 0) {
				return dispatch(
					setNotification({
						message: 'Проблемы с соединением',
						errors: [],
						isError: true,
					})
				)
			}

			dispatch(setNotification({ ...error.response?.data, isError: true }))
			return [] as IHouse[]
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouses().then(data => {
			if (data !== []) {
				return setHouses([] as IHouse[])
			}

			return setHouses(data)
		})
	}, [])

	return (
		<Container className="py-3">
			<h2 className="text-center mt-4">Места отдыха</h2>
			<div className="search d-md-flex align-items-end justify-content-between gap-5 my-4">
				<div className="search-area d-flex flex-column w-100">
					<h5>Область</h5>
					<select className="search-area__select form-select">
						<option value="1" selected>
							Любая
						</option>
						<option value="2">Минская область</option>
						<option value="3">Брестская область</option>
						<option value="4">Витебская область</option>
						<option value="5">Гомельская область</option>
						<option value="6">Гродненская область</option>
						<option value="7">Могилевская область</option>
					</select>
				</div>
				<div className="search-title d-flex flex-column w-100">
					<h5>Название</h5>
					<input
						type="text"
						className="search-title__input form-control"
						placeholder="Название"
					/>
				</div>
				<Button variant="primary" className="search-btn">
					Отфильтровать
				</Button>
			</div>

			{isLoading ? (
				<Loader />
			) : houses.length > 0 ? (
				<>
					<div className="houses d-md-flex align-items-center justify-content-around flex-wrap">
						{houses.map((house: IHouse) => (
							<House key={house.id} {...house} />
						))}
					</div>
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
