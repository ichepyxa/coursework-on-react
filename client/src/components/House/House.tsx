import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IHouse } from '../../models'

import './style.css'

const House: FC<IHouse> = ({ houseId, images, name, category, price }) => {
	return (
		<div className="house">
			{true ? (
				<div className="favorites house-item__favorites active"></div>
			) : (
				<div className="favorites house-item__favorites"></div>
			)}

			{images.length > 0 ? (
				<img
					className="house-item__image"
					src={images[Math.floor(Math.random() * images.length)].image}
					alt={name}
				/>
			) : (
				<div className="house-item__image"></div>
			)}

			<div
				className={`house-item__content ${
					name.length > 20 ? 'd-xxl-flex' : 'd-xl-flex'
				} justify-content-between align-items-end`}
			>
				<div className="house-item__content-info">
					{name.length > 20 ? (
						<h4 className="house-item__content-info__title">{name}</h4>
					) : (
						<h3 className="house-item__content-info__title">{name}</h3>
					)}
					<h5 className="house-item__content-info__type">{category}</h5>
					<span className="house-item__content-price d-block">
						{price > 0 ? (
							<span>
								Цена от: <strong>{price}</strong> BYN
							</span>
						) : (
							'Цену нужно уточнять'
						)}
					</span>
				</div>
				<Link
					to={`/houses/${houseId}`}
					className="house-item__content-btn btn btn-primary mt-2"
				>
					Подробнее
				</Link>
			</div>
		</div>
	)
}

export default House
