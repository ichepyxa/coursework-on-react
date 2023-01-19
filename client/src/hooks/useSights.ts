/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import { ISight } from '@src/models/index'
import { useSearchParams } from './useSearchParams'
import SightsService from '@src/services/sightsService'

export const useSights = () => {
	const dispatch = useDispatch()
	const { page, name, region } = useSearchParams()
	const [countPage, setCountPage] = useState<number>(0)
	const [sights, setSights] = useState<ISight[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getSights = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await SightsService.getSightsByFilters(page, name, region).then(
				response => {
					if (
						response.data.sights === undefined ||
						response.data.sights === ([] as ISight[])
					) {
						return setSights([] as ISight[])
					}

					setCountPage(response.data.count)
					setSights(response.data.sights as ISight[])
				}
			)
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getSights()
	}, [name, region, page])

	return { isLoading, sights, countPage }
}
