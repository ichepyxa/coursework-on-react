import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import SidebarNavbar from '../../components/SidebarNavbar/SidebarNavbar'
import { IHouse } from '../../models/index'

import './style.css'

const Booking: FC = () => {
	const houses: IHouse[] = [
		{
			houseId: 1,
			name: 'fsag',
			category: 'fdisaknjриалтвыфь штоЛьлладвыф',
			location: 'gds',
			price: 3244,
			description: 'gsgfs',
			images: [
				{
					imageId: 1,
					image:
						'https://www.holiday.by/files/houses/thumbnails/houses_gallery_preview/b0e6762b4c53b77487b1bd65c3cf8ca2.jpeg',
				},
			],
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
		{
			houseId: 4,
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
				<h2 className="text-center">Забронированные места отдыха</h2>
				<div className="list-group mt-3">
					<li className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between align-items-center">
							<div className="d-flex align-items-center gap-2">
								{houses[1].images.length > 0 ? (
									<img
										className="list-group-item-image"
										src={houses[1].images[0].image}
										alt={houses[1].name}
									/>
								) : (
									<div className="list-group-item-image"></div>
								)}
								<h5 className="mb-1">{houses[0].name}</h5>
							</div>
							<div className="d-flex flex-sm-row flex-column-reverse align-items-sm-center gap-2 gap-sm-4 align-items-end">
								<span className="p-1 px-3 border border-2 border-success text-success rounded">
									Успешно
								</span>
								<small>3 days ago</small>
							</div>
						</div>
					</li>
					<li className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between align-items-center">
							<div className="d-flex align-items-center gap-2">
								{houses[1].images.length > 0 ? (
									<img
										className="list-group-item-image"
										src={houses[1].images[0].image}
										alt={houses[1].name}
									/>
								) : (
									<div className="list-group-item-image"></div>
								)}
								<h5 className="mb-1">{houses[0].name}</h5>
							</div>
							<div className="d-flex flex-sm-row flex-column-reverse align-items-sm-center gap-2 gap-sm-4 align-items-end">
								<span className="p-1 px-3 border border-2 border-danger text-danger rounded">
									Отказ
								</span>
								<small>3 days ago</small>
							</div>
						</div>
					</li>
					<li className="list-group-item list-group-item-action">
						<div className="d-flex w-100 justify-content-between align-items-center">
							<div className="d-flex align-items-center gap-2">
								{houses[1].images.length > 0 ? (
									<img
										className="list-group-item-image"
										src={houses[1].images[0].image}
										alt={houses[1].name}
									/>
								) : (
									<div className="list-group-item-image"></div>
								)}
								<h5 className="mb-1">{houses[0].name}</h5>
							</div>
							<div className="d-flex flex-sm-row flex-column-reverse align-items-end align-items-sm-center gap-2 gap-sm-4">
								<span className="p-1 px-3 border border-2 border-warning text-warning rounded">
									Ожидание
								</span>
								<small>3 days ago</small>
							</div>
						</div>
					</li>
				</div>
				{/* <ul className="list-unstyled">
					<li className="w-100 bg-light">gfds</li>
				</ul> */}
			</div>
		</Container>
	)
}

export default Booking
