import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import HousesElement from '../../../components/HousesElement/HousesElement'
import SidebarNavbar from '../../../components/SidebarNavbar/SidebarNavbar'
import { IHouse } from '../../../models'

const TestResult: FC = () => {
	const houses: IHouse[] = [
		{
			houseId: 1,
			name: 'fsag',
			category: 'fdisaknjриалтвыфь штоЛьлладвыф',
			location: 'gds',
			price: 3244,
			description: 'gsgfs',
			images: [],
			createdAt: '23fsa f',
			updatedAt: 'sagasggs',
			isFavorite: false,
		},
		{
			houseId: 2,
			name: 'fsag',
			category: 'fdisaknjриалтвыфь штоЛьлладвыф',
			location: 'gds',
			price: 3244,
			description: 'gsgfs',
			images: [],
			createdAt: '23fsa f',
			updatedAt: 'sagasggs',
			isFavorite: false,
		},
		{
			houseId: 3,
			name: 'fsag',
			category: 'fdisaknjриалтвыфь штоЛьлладвыф',
			location: 'gds',
			price: 3244,
			description: 'gsgfs',
			images: [],
			createdAt: '23fsa f',
			updatedAt: 'sagasggs',
			isFavorite: false,
		},
	]

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<SidebarNavbar />
			<div className="mt-lg-4 w-100">
				<h2 className="text-center">Результаты теста</h2>
				<HousesElement houses={houses} />
			</div>
		</Container>
	)
}

export default TestResult
