import { setIsAuth, setUser } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import displayTroubleConnectionError from './displayTroubleConnectionError'
import UsersService from '@src/services/usersService'

export const checkAuth = async (dispatch: CallableFunction) => {
	try {
		dispatch(setIsLoading(true))
		await UsersService.refresh().then(response => {
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
