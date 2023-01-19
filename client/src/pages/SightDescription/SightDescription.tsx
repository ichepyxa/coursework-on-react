import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import { Link, useNavigate, useParams } from 'react-router-dom'

import SightsService from '@src/services/sightsService'
import Loader from '@src/components/Loader/Loader'
import { titleName } from '@src/constants/titleName'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { onClickFavoritesBtn } from '@src/helpers/favoritesSightsBtnClicks'
import filterFavoritesSights from '@src/helpers/filterFavoritesSights'
import { useAuth } from '@src/hooks/useAuth'
import { ISight } from '@src/models/index'
import { useAppDispatch } from '@src/store/hook'
import Images from './components/Images/Images'

import './style.css'

const SightDescription: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const { isAuth, isAdmin } = useAuth()
	const [sight, setSight] = useState<ISight>({} as ISight)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [favoritesSights, setFavoritesSights] = useState<ISight[]>([])

	const getFavoritesSights = async (): Promise<void> => {
		await SightsService.getFavoritesSights().then(response => {
			if (
				response.data.sights === undefined ||
				response.data.sights === ([] as ISight[])
			) {
				return setFavoritesSights([] as ISight[])
			}

			setFavoritesSights(response.data.sights as ISight[])
		})
	}

	const favoritesBtns = (): React.ReactNode => {
		if (isAdmin) {
			return <></>
		}

		return sight.isFavorite ? (
			<div
				className="favorites sight-item__favorites active"
				onClick={(e: any) =>
					onClickFavoritesBtn(e, isAuth, navigate, sight.sightId)
				}
			></div>
		) : (
			<div
				className="favorites sight-item__favorites"
				onClick={(e: any) =>
					onClickFavoritesBtn(e, isAuth, navigate, sight.sightId)
				}
			></div>
		)
	}

	const getSight = async (): Promise<void> => {
		try {
			setIsLoading(true)

			const sightId = !params.sightId ? '' : params.sightId
			await SightsService.getSight(sightId).then(response => {
				if (response.data === undefined || response.data === ({} as ISight)) {
					return setSight({} as ISight)
				}

				setSight(response.data as ISight)
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getSight()
	}, [])

	useEffect(() => {
		if (isAuth && !isAdmin) {
			getFavoritesSights()
		}
	}, [isAuth, isAdmin])

	useEffect(() => {
		setSight(filterFavoritesSights([sight], favoritesSights)[0])
	}, [favoritesSights])

	return (
		<Container as="section" className="description py-4">
			{isLoading ? (
				<Loader />
			) : sight !== null && Object.keys(sight).length > 0 ? (
				<>
					<DocumentTitle title={`${titleName} ${sight.name}`} />
					<h2 className="text-center mt-2 mb-4">{sight.name}</h2>

					{sight.images.length > 0 ? (
						<div>
							<Images name={sight.name} images={sight.images}>
								{favoritesBtns()}
							</Images>
						</div>
					) : (
						<div className="sight-description__image not-image mb-3">
							{favoritesBtns()}
						</div>
					)}

					<p className="fs-5">
						<span className="fw-bold text-uppercase">Категория:</span>{' '}
						{sight.category
							.split(',')
							.map(item => {
								const trimItem = item.trim()
								if (trimItem.length < 2) {
									return trimItem
								}

								return trimItem[0].toString().toUpperCase() + trimItem.slice(1)
							})
							.join(', ')}
					</p>
					<p className="fs-5">
						<span className="fw-bold text-uppercase">Местонахождение:</span>{' '}
						{sight.location}
					</p>
					<p className="text-uppercase d-inline-block m-0 fs-5 fw-bold">
						Описание:
					</p>
					{sight.description.length > 0 ? (
						<span className="word-break fs-5"> {sight.description}</span>
					) : (
						<span className="fs-5"> Описание отсутвует</span>
					)}
					<p className="text-uppercase mt-4 fs-5 font-italic">
						<span className="fw-bold">Дата изменения: </span>
						{new Date(sight.updatedAt).toLocaleString()}
					</p>
				</>
			) : (
				<div className="mt-5 d-flex justify-content-center align-items-center flex-column">
					<h4 className="mb-4 text-center">
						Такая достопримечательность не найдена.
					</h4>
					<Link className="btn btn-primary" to="/sights">
						Вернуться к достопримечательностям
					</Link>
				</div>
			)}
		</Container>
	)
}

export default SightDescription
