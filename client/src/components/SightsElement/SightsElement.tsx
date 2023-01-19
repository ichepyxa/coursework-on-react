import { FC, useEffect, useState } from 'react'
import { ISight } from '@src/models'
import Sight from '@src/components/Sight/Sight'
import filterFavoritesSights from '@src/helpers/filterFavoritesSights'
import { useAuth } from '@src/hooks/useAuth'
import SightsService from '@src/services/sightsService'

const SightsElement: FC<{ sights: ISight[] }> = ({ sights }) => {
	const { isAuth, isAdmin } = useAuth()
	const [newSights, setNewSights] = useState<ISight[]>(sights)
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

	useEffect(() => {
		if (isAuth && !isAdmin) {
			getFavoritesSights()
		}
	}, [isAuth, isAdmin])

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
