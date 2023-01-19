/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import Loader from '@src/components/Loader/Loader'
import Images from './components/Images/Images'
import { categoriesHousesWithoutPrice } from '@src/constants/categoriesHousesWithoutPrice'
import { titleName } from '@src/constants/titleName'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { onClickFavoritesBtn } from '@src/helpers/favoritesHousesBtnClicks'
import filterFavoritesHouses from '@src/helpers/filterFavoritesHouses'
import { IHouse } from '@src/models'
import { useAppDispatch, useAppSelector } from '@src/store/hook'
import { useAuth } from '@src/hooks/useAuth'
import HousesService from '@src/services/housesService'

import './style.css'

const categoriesHousesWithOtherText: { [key: string]: string } = {
	Отель: 'номер',
	Баня: 'баню',
	Апартаменты: 'апартаменты',
	Беседка: 'беседку',
	'Открытая беседка': 'беседку',
	'Закрытая беседка': 'беседку',
}

const HouseDescription: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const { isAuth, isAdmin } = useAuth()
	const [house, setHouse] = useState<IHouse>({} as IHouse)
	const [favoritesHouses, setFavoritesHouses] = useState<IHouse[]>([])
	const [isBooking, setIsBooking] = useState<boolean | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const addBookingHouse = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await HousesService.addBookingHouse({ houseId: params.houseId }).then(
				response => {
					if (response.status !== 200) {
						return setIsBooking(null)
					}

					setIsBooking(true)
				}
			)
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	const getIsBooking = async (): Promise<void> => {
		const houseId = !params.houseId ? '' : params.houseId
		await HousesService.getIsBooking(houseId).then(response => {
			if (response.data === undefined) {
				return setIsBooking(null)
			}

			setIsBooking(response.data)
		})
	}

	const getFavoritesHouses = async (): Promise<void> => {
		await HousesService.getFavoritesHouses().then(response => {
			if (
				response.data.houses === undefined ||
				response.data.houses === ([] as IHouse[])
			) {
				return setFavoritesHouses([] as IHouse[])
			}

			setFavoritesHouses(response.data.houses as IHouse[])
		})
	}

	const getHouse = async (): Promise<void> => {
		try {
			setIsLoading(true)

			const houseId = !params.houseId ? '' : params.houseId
			await HousesService.getHouse(houseId).then(response => {
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

	const favoritesBtns = (): React.ReactNode => {
		if (isAdmin) {
			return <></>
		}

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
		if (isAuth && !isAdmin) {
			getIsBooking()
			getFavoritesHouses()
		}
	}, [isAuth, isAdmin])

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
						<div className="house-description__group">
							<p className="fs-5">
								<span className="fw-bold text-uppercase">Цена:</span>
								{house.price > 0
									? ` от ${house.price} BYN за ${
											Object.keys(categoriesHousesWithOtherText).includes(
												house.category
											)
												? `${
														categoriesHousesWithOtherText[house.category]
												  } на сутки`
												: 'сутки'
									  }`
									: ' нужно уточнять'}
							</p>
							<Button
								variant="primary"
								className="house-description__booking mb-3 d-inline-block"
								disabled={isBooking ? true : undefined}
								onClick={addBookingHouse}
							>
								{isBooking ? 'Уже забронированно' : 'Забронировать'}
							</Button>
						</div>
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
