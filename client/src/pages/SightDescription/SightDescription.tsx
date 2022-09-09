import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import { ISight } from '../../models'
import { useAppDispatch } from '../../store/hook'
import Images from './components/Images/Images'

import './style.css'

const SightDescription: FC = () => {
	const dispatch = useAppDispatch()
	const params = useParams()

	const [sight, setSight] = useState<ISight>({} as ISight)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getSight = async () => {
		setIsLoading(true)
		try {
			await axios
				.get<ISight>(`${API_URL}/sights/${params.sightId}`)
				.then(response => {
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

	return (
		<Container as="section" className="description py-4">
			{isLoading ? (
				<Loader />
			) : sight !== null && Object.keys(sight).length > 0 ? (
				<>
					<h2 className="text-center mt-2 mb-4">
						{sight.name.toLowerCase().includes(
							sight.category
								.split(',')[0]
								.substring(0, sight.category.length - 1)
								.toLowerCase()
						)
							? ''
							: sight.category
									.split(',')
									.map(item => item[0].toUpperCase() + item.slice(1))[0]}{' '}
						{sight.name}
					</h2>

					{sight.images.length > 0 ? (
						<Images name={sight.name} images={sight.images} />
					) : (
						<div className="sight-description__image"></div>
					)}

					<p className="fs-5">
						<span className="fw-bold text-uppercase">Категория:</span>{' '}
						{sight.category
							.split(',')
							.map(item => item[0].toUpperCase() + item.slice(1))
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
