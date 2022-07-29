import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IHouse } from '../../pages/Home/components/RecommendedHouses/RecommendedHouses'

const House: FC<IHouse> = ({
	isFavorite,
	image,
	title,
	category,
	price,
	link,
}) => {
	return (
		<div className='house'>
			{isFavorite ? (
				<div className='favorites house-item__favorites active'></div>
			) : (
				<div className='favorites house-item__favorites'></div>
			)}
			{image ? (
				<img className='house-item__image' src={image} alt={title} />
			) : (
				<div className='house-item__image'></div>
			)}

			<div
				className={`house-item__content ${
					title.length > 20 ? 'd-xxl-flex' : 'd-xl-flex'
				} justify-content-between align-items-end`}
			>
				<div className='house-item__content-info'>
					{title.length > 20 ? (
						<h4 className='house-item__content-info__title'>{title}</h4>
					) : (
						<h3 className='house-item__content-info__title'>{title}</h3>
					)}
					<h5 className='house-item__content-info__type'>{category}</h5>
					<span className='house-item__content-price d-block'>{price}</span>
				</div>
				<Link
					to={`/houses/description?url=${link}`}
					className='house-item__content-btn btn btn-primary mt-2'
				>
					Подробнее
				</Link>
			</div>
		</div>
	)
}

export default House
