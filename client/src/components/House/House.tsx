import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../constants/apiUrl'
import api from '../../http'
import { IHouse, IHouseFavoritesResponse } from '../../models'
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

	const removeFavoritesHouses = async (e: any) => {
		await api
			.delete(`${API_URL}/houses/favoritesHouses/${houseId}`)
			.then(response => {
				e.target.classList.remove('active')
			})
	}

	const addFavoritesHouses = async (e: any) => {
		return await api
			.post<IHouseFavoritesResponse>(`${API_URL}/houses/favoritesHouses`, {
				houseId,
			})
			.then(response => {
				e.target.classList.add('active')
			})
	}

	const toggleFavorites = (e: any) => {
		if (e.target.classList.contains('active')) {
			return removeFavoritesHouses(e)
		}

		addFavoritesHouses(e)
	}

	const onClickFavoritesBtn = (e: any) =>
		isAuth ? toggleFavorites(e) : navigate('/account/login')

	return (
		<div className="house">
			{isFavorite ? (
				<div
					className="favorites house-item__favorites active"
					onClick={(e: any) => onClickFavoritesBtn(e)}
				></div>
			) : (
				<div
					className="favorites house-item__favorites"
					onClick={(e: any) => onClickFavoritesBtn(e)}
				></div>
			)}

			{images?.length > 0 ? (
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
								Цена: <strong>{price}</strong> BYN
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
