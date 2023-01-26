import { getStringData } from './storage'

export const checkIsAuth = async (setIsAuth: CallableFunction) => {
	await getStringData('token').then(token => {
		setIsAuth(token ? true : false)
	})
}
