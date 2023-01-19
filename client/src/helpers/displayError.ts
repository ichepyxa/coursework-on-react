import { setNotification } from '@src/store/slices/notificationSlice'

export default function displayError(
	dispatch: CallableFunction,
	message: string,
	errors: [] = []
): void {
	dispatch(
		setNotification({
			message,
			isError: true,
			errors,
		})
	)
}
