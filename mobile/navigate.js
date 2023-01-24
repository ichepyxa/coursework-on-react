import { useEffect, useState } from 'react'
import { isUserAuth } from './src/helpers/checkAuth'
import GuestRoutes from './src/routes/GuestRoutes'
import AuthRoutes from './src/routes/AuthRoutes'
import { storeData } from './src/helpers/storage'

export default function Navigate() {
	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		isUserAuth().then(res => setIsAuth(res))
	}, [])

	console.log(isAuth)

	return isAuth ? <AuthRoutes /> : <GuestRoutes />
}
