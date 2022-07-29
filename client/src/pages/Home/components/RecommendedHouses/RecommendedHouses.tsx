import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import House from '../../../../components/House/House'

export interface IHouse {
	isFavorite: boolean
	image: string
	title: string
	category: string
	price: number
	link: string
	id: number
}

const RecommendedHouses: FC = () => {
	const houses: IHouse[] = [
		{
			id: 1,
			title: 'fdfgg',
			link: 'fdgdgd',
			price: 270,
			category: 'fdgdf',
			isFavorite: true,
			image: '',
		},
	]

	return (
		<Container className='py-3'>
			<h2 className='text-center'>Рекомендуемые места отдыха</h2>
			<div className='houses d-md-flex align-items-center justify-content-between flex-wrap'>
				{houses && houses.map((house: IHouse) => <House {...house} />)}
			</div>
		</Container>
	)
}

export default RecommendedHouses
