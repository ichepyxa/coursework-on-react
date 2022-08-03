import { useAppSelector } from '../store/hook'
import { IUser } from '../models'

export const useAuth = () => {
	const {
		id,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
	}: IUser = useAppSelector(state => state.user.user)

	return {
		id,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
	}
}
