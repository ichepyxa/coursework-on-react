import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
	id: number | undefined
	username: string | undefined
	email: string | undefined
	activationLink: string | undefined
	isActivated: boolean | undefined
	isPassedTest: boolean | undefined
	isAuth: boolean
}

type UserState = {
	user: User
}

const initialState: UserState = {
	user: {
		id: undefined,
		username: undefined,
		email: undefined,
		activationLink: undefined,
		isActivated: undefined,
		isPassedTest: undefined,
		isAuth: false,
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload
		},
		removeUser(state) {
			state.user = {} as User
		},
		changeUserAuth(state, action: PayloadAction<boolean>) {
			state.user.isAuth = action.payload
		},
	},
})

export const { setUser, removeUser, changeUserAuth } = userSlice.actions
export default userSlice.reducer
