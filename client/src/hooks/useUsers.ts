/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from '../constants/apiUrl'
import displayTroubleConnectionError from '../helpers/displayTroubleConnectionError'
import api from '../lib/axios'
import { IUserAdmin, IUsersResponse } from '../models/index'
import { useSearchParams } from './useSearchParams'

export const useUsers = () => {
	const dispatch = useDispatch()
	const { name } = useSearchParams()
	const [users, setUsers] = useState<IUserAdmin[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getSights = async () => {
		setIsLoading(true)
		try {
			await api.get<IUsersResponse>(`${API_URL}/users`).then(response => {
				if (
					response.data.users === undefined ||
					response.data.users === ([] as IUserAdmin[])
				) {
					return setUsers([] as IUserAdmin[])
				}

				setUsers(response.data.users as IUserAdmin[])
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getSights()
	}, [name])

	return { isLoading, users }
}
