import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { API_URL } from '../../../../constants/apiUrl'
import { IHouse, IHouseResponse } from '../../../../models'
import HousesElement from '../../../../components/HousesElement/HousesElement'

const RecommendedHouses: FC = () => {
	const [houses, setHouses] = useState<IHouse[]>([])

	const getRecommendedHouses = async () => {
		try {
			const response = await axios.get<IHouseResponse>(
				`${API_URL}/houses?page=1`
			)

			const houses = response.data.houses
			const filterResponse: IHouse[] = []

			while (filterResponse.length < 6) {
				const item = houses[Math.floor(Math.random() * houses.length)]
				if (filterResponse.includes(item)) continue

				filterResponse.push(item)
			}

			return filterResponse
		} catch (error: any) {
			return [] as IHouse[]
		}
	}

	useEffect(() => {
		getRecommendedHouses().then(data => {
			return setHouses(data)
		})
	}, [])

	return (
		<>
			{houses?.length > 0 ? (
				<Container className="py-4" as="section">
					<h2 className="text-center">Рекомендуемые места отдыха</h2>
					<HousesElement houses={houses} />
				</Container>
			) : (
				<></>
			)}
		</>
	)
}

export default RecommendedHouses
