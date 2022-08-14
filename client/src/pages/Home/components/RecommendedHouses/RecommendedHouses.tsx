import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import House from '../../../../components/House/House'
import { API_URL } from '../../../../constants/apiUrl'
import { IHouse } from '../../../../models'

const RecommendedHouses: FC = () => {
	const [recommendedHouses, setRecommendedHouses] = useState<IHouse[]>([])

	const getRecommendedHouses = async () => {
		try {
			const response = await axios.get<IHouse[]>(`${API_URL}/houses?page=1`)
			let filterResponse: IHouse[] = []
			response.data.forEach((item, index) => {
				if (index < 6) filterResponse.push(item)
			})
			return filterResponse
		} catch (error: any) {
			return [] as IHouse[]
		}
	}

	useEffect(() => {
		getRecommendedHouses().then(data => {
			return setRecommendedHouses(data)
		})
	}, [])

	return (
		<Container className="py-3" as="section">
			<h2 className="text-center">Рекомендуемые места отдыха</h2>
			<div className="houses d-md-flex align-items-center justify-content-around flex-wrap">
				{recommendedHouses &&
					recommendedHouses.map((house: IHouse) => (
						<House key={house.id} {...house} />
					))}
			</div>
		</Container>
	)
}

export default RecommendedHouses
