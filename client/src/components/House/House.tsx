import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categoriesHousesWithoutPrice } from '../../constants/categoriesHousesWithoutPrice'
import { onClickFavoritesBtn } from '../../helpers/favoritesHousesBtnClicks'
import { IHouse } from '../../models/index'
import { useAppSelector } from '../../store/hook'

import './style.css'

const House: FC<IHouse> = ({
	houseId,
	images,
	name,
	category,
	price,
	isFavorite = false,
}) => {
	const navigate = useNavigate()
	const { isAuth } = useAppSelector(state => state.user)

	return (
		<div className="house">
			{isFavorite ? (
				<div
					className="favorites house-item__favorites active"
					onClick={(e: any) =>
						onClickFavoritesBtn(e, isAuth, navigate, houseId)
					}
				></div>
			) : (
				<div
					className="favorites house-item__favorites"
					onClick={(e: any) =>
						onClickFavoritesBtn(e, isAuth, navigate, houseId)
					}
				></div>
			)}

			{images?.length > 0 ? (
				<img
					className="house-item__image"
					src={images[0].image} //Math.floor(Math.random() * images.length)
					alt={name}
				/>
			) : (
				<div className="house-item__image"></div>
			)}

			<div
				className={`house-item__content ${
					name.length > 30 ? 'd-xxl-flex' : 'd-xl-flex'
				} justify-content-between align-items-end`}
			>
				<div className="house-item__content-info">
					<h5 className="house-item__content-info__title fw-semibold">
						{name.length > 30 ? `${name.substring(0, 30)}...` : name}
					</h5>
					<h6 className="house-item__content-info__type fw-normal">
						{category}
					</h6>
					{categoriesHousesWithoutPrice.includes(category) ? (
						<></>
					) : (
						<span className="house-item__content-price d-block">
							{price > 0 ? (
								<span>
									Цена: <strong>{price}</strong> BYN
								</span>
							) : (
								'Цену нужно уточнять'
							)}
						</span>
					)}
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
