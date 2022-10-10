import { useAppSelector } from '../store/hook'
import { IUser } from '../models/index'

export const useAuth = () => {
	const {
		userId,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
		avatar,
		roleId,
		isAdmin
	}: IUser = useAppSelector(state => state.user.user)
	const isAuth = useAppSelector(state => state.user.isAuth)

	return {
		userId,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
		avatar,
		isAuth,
		roleId,
		isAdmin
	}
}
