import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import HousesElement from '@src/components/HousesElement/HousesElement'
// import HousesElement from '@src/components/HousesElement/HousesElement'
import { IHouse } from '@src/models/index'
import HousesService from '@src/services/housesService'

const RecommendedHouses: FC = () => {
	const [houses, setHouses] = useState<IHouse[]>([])
	const maxRecommendedHousesCount: number = 6

	const getRecommendedHouses = async (): Promise<void> => {
		try {
			await HousesService.getHouses(1).then(response => {
				if (
					response.data.houses === undefined ||
					response.data.houses === ([] as IHouse[])
				) {
					return setHouses([] as IHouse[])
				}

				const houses = response.data.houses
				if (houses.length > 0 && houses.length < maxRecommendedHousesCount)
					return setHouses(houses)

				const filterResponse: IHouse[] = []
				while (filterResponse.length < maxRecommendedHousesCount) {
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
					{houses?.length < maxRecommendedHousesCount ? (
						<></>
					) : (
						<div className="mt-4 d-flex justify-content-center align-items-center">
							<Link to="/houses" className="btn btn-outline-primary">
								Смотреть больше
							</Link>
						</div>
					)}
				</Container>
			) : (
				<></>
			)}
		</>
	)
}

export default RecommendedHouses
