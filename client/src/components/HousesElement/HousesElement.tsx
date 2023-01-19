import { FC, useEffect, useState } from 'react'

import { IHouse } from '@src/models/index'
import House from '@src/components/House/House'
import filterFavoritesHouses from '@src/helpers/filterFavoritesHouses'
import { useAuth } from '@src/hooks/useAuth'
import HousesService from '@src/services/housesService'

const HousesElement: FC<{ houses: IHouse[] }> = ({ houses }) => {
	const { isAuth, isAdmin } = useAuth()
	const [newHouses, setNewHouses] = useState<IHouse[]>(houses)
	const [favoritesHouses, setFavoritesHouses] = useState<IHouse[]>([])

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

	useEffect(() => {
		if (isAuth && !isAdmin) {
			getFavoritesHouses()
		}
	}, [isAuth, isAdmin])

	useEffect(() => {
		setNewHouses(filterFavoritesHouses(houses, favoritesHouses))
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
