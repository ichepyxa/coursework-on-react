/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/apiUrl'
import displayTroubleConnectionError from '../helpers/displayTroubleConnectionError'
import { IHouse, IHousesResponse } from '../models/index'
import { useSearchParams } from './useSearchParams'

export const useHouses = () => {
	const dispatch = useDispatch()
	const { page, name, region } = useSearchParams()
	const [countPage, setCountPage] = useState<number>(0)
	const [houses, setHouses] = useState<IHouse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getHouses = async () => {
		setIsLoading(true)
		try {
			await axios
				.get<IHousesResponse>(
					`${API_URL}/houses?page=${page}&name=${name}&region=${region}`
				)
				.then(response => {
					if (
						response.data.houses === undefined ||
						response.data.houses === ([] as IHouse[])
					) {
						return setHouses([] as IHouse[])
					}

					setCountPage(response.data.count)
					setHouses(response.data.houses as IHouse[])
				})
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
