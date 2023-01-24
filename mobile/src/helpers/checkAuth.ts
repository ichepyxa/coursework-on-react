import { getStringData } from './storage'

export const isUserAuth = async () => {
	let isAuth = false
	await getStringData('token').then(token => (isAuth = token ? true : isAuth))
	return isAuth
}
