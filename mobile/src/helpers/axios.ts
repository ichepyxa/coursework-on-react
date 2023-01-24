import axios from 'axios'

import { API_URL } from '../constants/apiUrl'
import IUserResponse from '../models/IUserResponse'
import { getStringData, storeData } from './storage'

const api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

api.interceptors.request.use(async (config: any) => {
	await getStringData('token').then(token => {
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		console.log(token)
	})

	return config
})

api.interceptors.response.use(
	(config: any) => {
		return config
	},
	async error => {
		const originalRequest = error.config

		if (
			error.response.status === 401 &&
			error.config &&
			error.config._isRetry
		) {
			try {
				originalRequest._isRetry = true
				await axios
					.get<IUserResponse>(`${API_URL}/refresh`, {
						withCredentials: true,
					})
					.then(response => storeData('token', response.data.accessToken))
				return api.request(originalRequest)
			} catch (error) {
				console.log(error)
			}
		}
		throw error
	}
)

export default api
