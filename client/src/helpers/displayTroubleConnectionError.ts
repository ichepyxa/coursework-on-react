import { AxiosError } from 'axios'

import { NotificationState } from '@src/models'
import displayError from './displayError'

export default function displayTroubleConnectionError(
	dispatch: CallableFunction,
	error: AxiosError<NotificationState> = new AxiosError(
		'Проблемы с соединением'
	)
): void {
	if (error.response?.status === 0) {
		displayError(dispatch, 'Проблемы с соединением')
		return
	}

	if (error.response?.data) {
		const message: string = !error.response?.data.message
			? ''
			: error.response?.data.message
		const errors: [] = !error.response.data.errors
			? []
			: error.response.data.errors

		displayError(dispatch, message, errors)
	}
}
