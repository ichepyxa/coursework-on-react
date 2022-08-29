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
	}: IUser = useAppSelector(state => state.user.user)

	return {
		userId,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
	}
}
