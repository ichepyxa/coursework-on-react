import { setIsAuth, setIsLoading, setUser } from '../store/slices/userSlice'
import axios from 'axios'
import { API_URL } from '../constants/apiUrl'
import { IUserResponse } from '../models/index'
import displayTroubleConnectionError from './displayTroubleConnectionError'

export const checkAuth = async (dispatch: CallableFunction) => {
		dispatch(setIsLoading(true))
		try {
			await axios
				.get<IUserResponse>(`${API_URL}/users/refresh`, {
					withCredentials: true,
				})
				.then(response => {
					localStorage.setItem('token', response.data.accessToken)
					dispatch(setUser(response.data.user))
					dispatch(setIsAuth(true))
				})
			// dispatch(
			// 	setNotification({
			// 		message: 'С возвращением',
			// 		isError: false,
			// 		errors: [],
			// 	})
			// )
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}