import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PageState = {
	isLoading: boolean
}

const initialState: PageState = {
	isLoading: false,
}

const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
	},
})

export const { setIsLoading } = pageSlice.actions
export default pageSlice.reducer
