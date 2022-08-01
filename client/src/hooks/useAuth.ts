import { useAppSelector } from '../store/hook'
import { User } from '../store/slices/userSlice'

export const useAuth = () => {
	const {
		id,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
		isAuth,
	}: User = useAppSelector(state => state.user.user)

	return {
		id,
		username,
		email,
		activationLink,
		isActivated,
		isPassedTest,
		isAuth,
	}
}
