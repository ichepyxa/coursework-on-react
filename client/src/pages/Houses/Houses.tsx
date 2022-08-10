import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import House from '../../components/House/House'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { IHouse } from '../../models'

const Houses: FC<{ page: string | null }> = ({ page = '1' }) => {
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
			return [] as IHouse[]
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouses().then(data => {
			return setHouses(data)
		})
	}, [])

	return (
		<Container className="py-3">
			<h2 className="text-center mt-4">Места отдыха</h2>
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
