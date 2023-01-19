import SightsService from '@src/services/sightsService'

export const removeFavoritesSights = async (e: any, sightId: number) => {
	await SightsService.deleteFavoritesSight(`${sightId}`).then(() => {
		e.target.parentNode.classList.add('favorites-opacity')
		e.target.classList.remove('active')
	})
}

export const addFavoritesSights = async (e: any, sightId: number) => {
	return await SightsService.addFavoritesSight(`${sightId}`).then(() => {
		e.target.parentNode.classList.remove('favorites-opacity')
		e.target.classList.add('active')
	})
}

export const toggleFavorites = (e: any, sightId: number) => {
	if (e.target.classList.contains('active')) {
		return removeFavoritesSights(e, sightId)
	}

	addFavoritesSights(e, sightId)
}

export const onClickFavoritesBtn = (
	e: any,
	isAuth: boolean,
	navigate: CallableFunction,
	sightId: number
) => (isAuth ? toggleFavorites(e, sightId) : navigate('/account/login'))
