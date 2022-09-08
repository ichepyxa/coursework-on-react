import React, { FC, useEffect, useState } from 'react'
import { IHouse, IHouseFavorites, IHouseFavoritesResponse } from '../../models'
import House from '../House/House'
import { useAppSelector } from '../../store/hook'
import { API_URL } from '../../constants/apiUrl'
import api from '../../http'

const HousesElement: FC<{ houses: IHouse[] }> = ({ houses }) => {
	const { isAuth } = useAppSelector(state => state.user)
	const [newHouses, setNewHouses] = useState<IHouse[]>(houses)
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

	useEffect(() => {
		if (isAuth) {
			getFavoritesHouses()
		}
	}, [isAuth])

	useEffect(() => {
		if (favoritesHouses.length > 0) {
			favoritesHouses.forEach(favoriteHouse => {
				setNewHouses(oldHouses =>
					oldHouses.map(house =>
						house.houseId === favoriteHouse.houseId
							? { ...house, isFavorite: true }
							: house
					)
				)
			})

			console.log(newHouses)
		}
	}, [favoritesHouses])

	return (
		<div className="houses d-md-flex align-items-center justify-content-center flex-wrap">
			{newHouses.map((house: IHouse) => (
				<House key={house.houseId} {...house} />
			))}
		</div>
	)
}

export default HousesElement
