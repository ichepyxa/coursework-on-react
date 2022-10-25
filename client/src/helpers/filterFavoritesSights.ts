import { ISight } from '../models'

export default function filterFavoritesSights(
	sights: ISight[],
	favoriteSight: ISight[]
): ISight[] {
	let newSights = sights

	if (favoriteSight.length > 0) {
		favoriteSight.forEach(favoriteSight => {
			newSights = newSights.map(sight =>
				sight && sight.sightId === favoriteSight.sightId
					? { ...sight, isFavorite: true }
					: sight
			)
		})
	}

	return newSights
}
