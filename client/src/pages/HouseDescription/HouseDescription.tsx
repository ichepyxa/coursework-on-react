/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { categoriesHousesWithoutPrice } from '../../constants/categoriesHousesWithoutPrice'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import { onClickFavoritesBtn } from '../../helpers/favoritesHousesBtnClicks'
import filterFavoritesHouses from '../../helpers/filterFavoritesHouses'
import api from '../../http'
import { IHouse, IHouseFavoritesResponse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import Images from './components/Images/Images'

import './style.css'
import { useAuth } from '../../hooks/useAuth'

const categoriesHousesWithOtherText: { [key: string]: any } = {
	Отель: 'номер',
	Баня: 'баню',
	Апартаменты: 'апартаменты',
	Беседка: 'беседку',
	'Открытая беседка': 'беседку',
	'Закрытая беседка': 'беседку',
}

const HouseDescription: FC = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	const navigate = useNavigate()
	const { isAuth } = useAuth()
	const [house, setHouse] = useState<IHouse>({} as IHouse)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [favoritesHouses, setFavoritesHouses] = useState<IHouse[]>([])

	const getFavoritesHouses = async () => {
		await api
			.get<IHouseFavoritesResponse>(`${API_URL}/houses/favoritesHouses`)
			.then(response => {
				if (
					response.data.houses === undefined ||
					response.data.houses === ([] as IHouse[])
				) {
					return setFavoritesHouses([] as IHouse[])
				}

				setFavoritesHouses(response.data.houses as IHouse[])
			})
	}

	const getHouse = async () => {
		setIsLoading(true)
		try {
			await axios
				.get<IHouse>(`${API_URL}/houses/${params.houseId}`)
				.then(response => {
					if (response.data === undefined || response.data === ({} as IHouse)) {
						return setHouse({} as IHouse)
					}

					setHouse(response.data as IHouse)
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	const favoritesBtns = () => {
		return house.isFavorite ? (
			<div
				className="favorites house-item__favorites active"
				onClick={(e: any) =>
					onClickFavoritesBtn(e, isAuth, navigate, house.houseId)
				}
			></div>
		) : (
			<div
				className="favorites house-item__favorites"
				onClick={(e: any) =>
					onClickFavoritesBtn(e, isAuth, navigate, house.houseId)
				}
			></div>
		)
	}

	useEffect(() => {
		getHouse()
	}, [])

	useEffect(() => {
		if (isAuth) {
			getFavoritesHouses()
		}
	}, [isAuth])

	useEffect(() => {
		setHouse(filterFavoritesHouses([house], favoritesHouses)[0])
	}, [favoritesHouses])

	return (
		<Container as="section" className="description py-4">
			{isLoading ? (
				<Loader />
			) : house !== null && Object.keys(house).length > 0 ? (
				<>
					<DocumentTitle title={`${titleName} ${house.name}`} />
					<h2 className="text-center mt-2 mb-4">{house.name}</h2>

					{house.images.length > 0 ? (
						<div>
							<Images name={house.name} images={house.images}>
								{favoritesBtns()}
							</Images>
						</div>
					) : (
						<div className="house-description__image not-image mb-3">
							{favoritesBtns()}
						</div>
					)}

					{categoriesHousesWithoutPrice.includes(house.category) ? (
						<></>
					) : (
						<p className="fs-5">
							<span className="fw-bold text-uppercase">Цена:</span>
							{house.price > 0
								? ` от ${house.price} BYN за ${
										Object.keys(categoriesHousesWithOtherText).includes(
											house.category
										)
											? categoriesHousesWithOtherText[house.category]
											: 'дом'
								  }`
								: ' нужно уточнять'}
						</p>
					)}
					<p className="fs-5">
						<span className="fw-bold text-uppercase">Категория:</span>{' '}
						{house.category}
					</p>
					<p className="fs-5">
						<span className="fw-bold text-uppercase">Местонахождение:</span>{' '}
						{house.location}
					</p>
					<p className="text-uppercase d-inline-block m-0 fs-5 fw-bold">
						Описание:
					</p>
					{house.description.length > 0 ? (
						<span className="word-break fs-5"> {house.description}</span>
					) : (
						<span className="fs-5"> Описание отсутвует</span>
					)}
					<p className="text-uppercase mt-4 fs-5 font-italic">
						<span className="fw-bold">Дата изменения: </span>
						{new Date(house.updatedAt).toLocaleString()}
					</p>
				</>
			) : (
				<div className="mt-5 d-flex justify-content-center align-items-center flex-column">
					<h4 className="mb-4 text-center">Такое место отдыха не найдено.</h4>
					<Link className="btn btn-primary" to="/houses">
						Вернуться к местам отдыха
					</Link>
				</div>
			)}
		</Container>
	)
}

export default HouseDescription
