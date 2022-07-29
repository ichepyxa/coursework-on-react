import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
	isAuth: boolean
}

type UserState = {
	user: User
}

const initialState: UserState = {
	user: {
		isAuth: false,
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeUserAuth(state, action: PayloadAction<boolean>) {
			state.user.isAuth = action.payload
		},
	},
})

export const { changeUserAuth } = userSlice.actions
export default userSlice.reducer
