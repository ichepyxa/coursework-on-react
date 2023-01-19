import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationState } from '@src/models/index'

const initialState: NotificationState = {
	message: undefined,
	isError: false,
	errors: [],
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action: PayloadAction<NotificationState>) {
			state.message = action.payload.message
			state.errors = action.payload.errors
			state.isError = action.payload.isError
		},
	},
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
