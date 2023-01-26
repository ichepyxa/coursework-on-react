import { useEffect, useState } from 'react'
import GuestRoutes from './src/routes/GuestRoutes'
import AuthRoutes from './src/routes/AuthRoutes'
import { NavigationContainer } from '@react-navigation/native'

export default function Navigate() {
	const [isAuth, setIsAuth] = useState(true)
	// useEffect(() => {
	// 	checkIsAuth(setIsAuth)
	// }, [])

	// console.log(isAuth)

	return (
		<NavigationContainer>
			{isAuth ? <AuthRoutes /> : <GuestRoutes />}
		</NavigationContainer>
	)
}
