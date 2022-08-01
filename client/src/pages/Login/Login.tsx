import React, { FC, useState } from 'react'
import { getAuth } from '../../hooks/getAuth'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../store/hook'
import { setUser, User } from '../../store/slices/userSlice'

const Login: FC = () => {
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	console.log(useAuth())

	const handleLogin = async (email: string, password: string) => {
		const auth = await getAuth(email, password)
		// console.log(auth)
		if (!auth) {
			console.log('Error auth')
		}

		const user = { ...auth?.user, isAuth: true } as User

		dispatch(setUser(user))
		localStorage.setItem('token', JSON.stringify(auth?.accessToken))
		// dispatch(changeUserAuth(!isUserAuth))
	}

	return (
		<div>
			<input
				type='email'
				placeholder='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<input
				type='password'
				placeholder='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>
			<button onClick={() => handleLogin(email, password)}>Login</button>
		</div>
	)
}

export default Login
