/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import HousesService from '@src/services/housesService'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { IHouse } from '@src/models'
import { useSearchParams } from './useSearchParams'

export const useHouses = () => {
	const dispatch = useDispatch()
	const { page, name, region } = useSearchParams()
	const [countPage, setCountPage] = useState<number>(0)
	const [houses, setHouses] = useState<IHouse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouses = async () => {
		try {
			setIsLoading(true)
			await HousesService.getHousesByFilters(page, name, region).then(
				response => {
					if (
						response.data.houses === undefined ||
						response.data.houses === ([] as IHouse[])
					) {
						return setHouses([] as IHouse[])
					}

					setCountPage(response.data.count)
					setHouses(response.data.houses as IHouse[])
				}
			)
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouses()
	}, [name, region, page])

	return { isLoading, houses, countPage }
}
