import { useAppSelector } from '../store/hook'
import { IUser } from '../models'

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
	}
}
