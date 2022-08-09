import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './slices/notificationSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
	reducer: {
		user: userReducer,
		notification: notificationSlice
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
