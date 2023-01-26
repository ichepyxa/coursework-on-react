import { useEffect, useState } from 'react'
import GuestRoutes from './src/routes/GuestRoutes'
import AuthRoutes from './src/routes/AuthRoutes'

export default function Navigate() {
	const [isAuth, setIsAuth] = useState(true)
	// useEffect(() => {
	// 	checkIsAuth(setIsAuth)
	// }, [])

	// console.log(isAuth)

	return isAuth ? <AuthRoutes /> : <GuestRoutes />
}
