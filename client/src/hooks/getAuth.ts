import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from '../constants/apiUrl'
import { IUserResponse, IUserLogin } from '../models'

export const getAuth = async (email: string, password: string) => {
	try {
		const { data } = await axios.post<IUserResponse>(
			`${API_URL}/users/login`,
			{ email, password },
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)

		return data
	} catch (error: any) {
		console.log(error.response.data.message)
		// if (axios.isAxiosError(error)) {
		// 	console.log('error message: ', error.message)
		// 	return error.message
		// } else {
		// 	console.log('unexpected error: ', error)
		// 	return 'An unexpected error occurred'
		// }
	}
}
