import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { API_URL } from '../../../../constants/apiUrl'
import { IHouse, IHouseResponse } from '../../../../models'
import HousesElement from '../../../../components/HousesElement/HousesElement'
import { Link } from 'react-router-dom'

const RecommendedHouses: FC = () => {
	const [houses, setHouses] = useState<IHouse[]>([])

	const getRecommendedHouses = async () => {
		try {
			await axios
				.get<IHouseResponse>(`${API_URL}/houses?page=1`)
				.then(response => {
					const houses = response.data.houses
					const filterResponse: IHouse[] = []

					while (filterResponse.length < 6) {
						const item = houses[Math.floor(Math.random() * houses.length)]
						if (filterResponse.includes(item)) continue

						filterResponse.push(item)
					}

					setHouses(filterResponse)
				})
		} catch (error: any) {
			setHouses([] as IHouse[])
		}
	}

	useEffect(() => {
		getRecommendedHouses()
	}, [])

	return (
		<>
			{houses?.length > 0 ? (
				<Container className="py-4" as="section">
					<h2 className="text-center">Рекомендуемые места отдыха</h2>
					<HousesElement houses={houses} />
					<div className="mt-4 d-flex justify-content-center align-items-center">
						<Link to="/houses" className="btn btn-outline-primary">
							Смотреть больше
						</Link>
					</div>
				</Container>
			) : (
				<></>
			)}
		</>
	)
}

export default RecommendedHouses
