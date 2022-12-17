import api from '../../../http'
import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SidebarNavbar from '../../../components/SidebarNavbar/SidebarNavbar'
import { API_URL } from '../../../constants/apiUrl'
import { ISightFavoritesResponse, ISight } from '../../../models'
import { useAppDispatch } from '../../../store/hook'
import Loader from '../../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import displayTroubleConnectionError from '../../../helpers/displayTroubleConnectionError'

import './style.css'
import SightsElement from '../../../components/SightsElement/SightsElement'

const FavoritesSights: FC = () => {
	const dispatch = useAppDispatch()
	const [sigths, setSights] = useState<ISight[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getSigths = async () => {
		setIsLoading(true)
		try {
			await api
				.get<ISightFavoritesResponse>(`${API_URL}/sights/favoritesSights`)
				.then(response => {
					if (
						response.data.sights === undefined ||
						response.data.sights === ([] as ISight[])
					) {
						return setSights([] as ISight[])
					}

					setSights(response.data.sights)
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getSigths()
	}, [])

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<SidebarNavbar />
			{isLoading ? (
				<Loader />
			) : sigths !== ([] as ISight[]) && sigths.length > 0 ? (
				<div className="mt-lg-4 w-100">
					<h3 className="text-center">Избранные достопримечательности</h3>
					<SightsElement sights={sigths} />
				</div>
			) : (
				<div className="w-100 d-flex justify-content-center align-items-center flex-column">
					<h2 className="mb-4 mt-lg-4 text-center mw-50 fs-4">
						У вас нет избранных достопримечательностей
					</h2>
					<Link
						to="/sights"
						className="houses__btn btn btn-outline-primary px-4"
					>
						Перейти к достопримечательностям
					</Link>
				</div>
			)}
		</Container>
	)
}

export default FavoritesSights
