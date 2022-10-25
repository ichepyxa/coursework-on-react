/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/apiUrl'
import displayTroubleConnectionError from '../helpers/displayTroubleConnectionError'
import { ISight, ISightsResponse } from '../models/index'
import { useSearchParams } from './useSearchParams'

export const useSights = () => {
	const dispatch = useDispatch()
	const { page, name, region } = useSearchParams()
	const [countPage, setCountPage] = useState<number>(0)
	const [sights, setSights] = useState<ISight[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getSights = async () => {
		setIsLoading(true)
		try {
			await axios
				.get<ISightsResponse>(
					`${API_URL}/sights?page=${page}&name=${name}&region=${region}`
				)
				.then(response => {
					if (
						response.data.sights === undefined ||
						response.data.sights === ([] as ISight[])
					) {
						return setSights([] as ISight[])
					}

					setCountPage(response.data.count)
					setSights(response.data.sights as ISight[])
				})
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
