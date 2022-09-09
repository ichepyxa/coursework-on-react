import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ISight } from '../../models'

import './style.css'

const Sight: FC<ISight> = ({ sightId, images, name, category }) => {
	const firstCategory = category.split(',')[0]
	const newCategory = firstCategory[0].toUpperCase() + firstCategory.slice(1)

	return (
		<div className="sight">
			{images?.length > 0 ? (
				<img
					className="sight-item__image"
					src={images[0].image} //Math.floor(Math.random() * images.length)
					alt={name}
				/>
			) : (
				<div className="sight-item__image"></div>
			)}

			<div
				className={`sight-item__content ${
					name.length > 17 ? 'd-xxl-flex' : 'd-xl-flex'
				} justify-content-between align-items-end`}
			>
				<div className="sight-item__content-info">
					<h3 className="sight-item__content-info__title">
						{name.length > 17 ? `${name.substring(0, 17)}...` : name}
					</h3>
					<h6 className="sight-item__content-info__type">{newCategory}</h6>
				</div>
				<Link
					to={`/sights/${sightId}`}
					className="sight-item__content-btn btn btn-primary mt-2"
				>
					Подробнее
				</Link>
			</div>
		</div>
	)
}

export default Sight
