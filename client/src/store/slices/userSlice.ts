import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/index'

type UserState = {
	user: IUser
	isAuth: boolean
}

const initialState: UserState = {
	user: {
		userId: undefined,
		username: undefined,
		email: undefined,
		activationLink: undefined,
		isActivated: undefined,
		isPassedTest: undefined,
		avatar: undefined,
		roleId: undefined,
		isAdmin: undefined,
	},
	isAuth: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
		},
		setAvatar(state, action: PayloadAction<string>) {
			state.user.avatar = action.payload
		},
	},
})

export const { setUser, setIsAuth, setAvatar } = userSlice.actions
export default userSlice.reducer
