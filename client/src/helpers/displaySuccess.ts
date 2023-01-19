import { setNotification } from '@src/store/slices/notificationSlice'

export default function displaySuccess(
	dispatch: CallableFunction,
	message: string
): void {
	dispatch(
		setNotification({
			message,
			isError: false,
			errors: [],
		})
	)
}
