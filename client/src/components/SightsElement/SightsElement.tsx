import React, { FC, useEffect, useState } from 'react'
import { ISight, ISightFavoritesResponse } from '../../models'
import { useAppSelector } from '../../store/hook'
import { API_URL } from '../../constants/apiUrl'
import api from '../../http'
import Sight from '../Sight/Sight'
import filterFavoritesSights from '../../helpers/filterFavoritesSights'

const SightsElement: FC<{ sights: ISight[] }> = ({ sights }) => {
	const { isAuth } = useAppSelector(state => state.user)
	const [newSights, setNewSights] = useState<ISight[]>(sights)
	const [favoritesSights, setFavoritesSights] = useState<ISight[]>([])

	const getFavoritesHouses = async () => {
		await api
			.get<ISightFavoritesResponse>(`${API_URL}/sights/favoritesSights`)
			.then(response => {
				if (
					response.data.sights === undefined ||
					response.data.sights === ([] as ISight[])
				) {
					return setFavoritesSights([] as ISight[])
				}

				setFavoritesSights(response.data.sights as ISight[])
			})
	}

	useEffect(() => {
		if (isAuth) {
			getFavoritesHouses()
		}
	}, [isAuth])

	useEffect(() => {
		setNewSights(filterFavoritesSights(sights, favoritesSights))
	}, [favoritesSights])

	return (
		<div className="sights d-md-flex align-items-center justify-content-center flex-wrap">
			{newSights.map((sight: ISight) => (
				<Sight key={sight.sightId} {...sight} />
			))}
		</div>
	)
}

export default SightsElement
