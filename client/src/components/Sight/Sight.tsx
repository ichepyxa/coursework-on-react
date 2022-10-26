import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onClickFavoritesBtn } from '../../helpers/favoritesSightsBtnClicks'
import { useAuth } from '../../hooks/useAuth'
import { ISight } from '../../models'

import './style.css'

const Sight: FC<ISight> = ({
	sightId,
	images,
	name,
	category,
	isFavorite = false,
}) => {
	const navigate = useNavigate()
	const { isAuth, isAdmin } = useAuth()
	const firstCategory = category.split(',')[0]
	const newCategory = firstCategory[0].toUpperCase() + firstCategory.slice(1)

	return (
		<div className="sight">
			{isAdmin ? (
				<></>
			) : isFavorite ? (
				<div
					className="favorites house-item__favorites active"
					onClick={(e: any) =>
						onClickFavoritesBtn(e, isAuth, navigate, sightId)
					}
				></div>
			) : (
				<div
					className="favorites house-item__favorites"
					onClick={(e: any) =>
						onClickFavoritesBtn(e, isAuth, navigate, sightId)
					}
				></div>
			)}

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
					name.length > 30 ? 'd-xxl-flex' : 'd-xl-flex'
				} justify-content-between align-items-end`}
			>
				<div className="sight-item__content-info">
					<h5 className="sight-item__content-info__title">
						{name.length > 30 ? `${name.substring(0, 30)}...` : name}
					</h5>
					<h6 className="sight-item__content-info__type fw-normal">
						{newCategory}
					</h6>
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
