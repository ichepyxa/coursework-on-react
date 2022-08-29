import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models'

type UserState = {
	user: IUser
	isLoading: boolean
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
		roleId: undefined,
	},
	isLoading: false,
	isAuth: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setIsAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
		},
	},
})

export const { setUser, setIsAuth, setIsLoading } = userSlice.actions
export default userSlice.reducer
