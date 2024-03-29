import HousesService from '@src/services/housesService'

export const removeFavoritesHouses = async (e: any, houseId: number) => {
	await HousesService.deleteFavoritesHouse(houseId).then(() => {
		e.target.parentNode.classList.add('favorites-opacity')
		e.target.classList.remove('active')
	})
}

export const addFavoritesHouses = async (e: any, houseId: number) => {
	return await HousesService.addFavoritesHouse(houseId).then(() => {
		e.target.parentNode.classList.remove('favorites-opacity')
		e.target.classList.add('active')
	})
}

export const toggleFavorites = (e: any, houseId: number) => {
	if (e.target.classList.contains('active')) {
		return removeFavoritesHouses(e, houseId)
	}

	addFavoritesHouses(e, houseId)
}

export const onClickFavoritesBtn = (
	e: any,
	isAuth: boolean,
	navigate: CallableFunction,
	houseId: number
) => (isAuth ? toggleFavorites(e, houseId) : navigate('/account/login'))
