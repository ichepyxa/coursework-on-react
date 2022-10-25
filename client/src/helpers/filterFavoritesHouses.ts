import { IHouse } from '../models'

export default function filterFavoritesHouses(
	houses: IHouse[],
	favoritesHouses: IHouse[]
): IHouse[] {
	let newHouses = houses

	if (favoritesHouses.length > 0) {
		favoritesHouses.forEach(favoriteHouse => {
			newHouses = newHouses.map(house =>
				house && house.houseId === favoriteHouse.houseId
					? { ...house, isFavorite: true }
					: house
			)
		})
	}

	return newHouses
}
