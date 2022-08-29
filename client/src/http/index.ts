import axios from 'axios'
import { API_URL } from '../constants/apiUrl'
import { IUserResponse } from '../models'

const api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

api.interceptors.request.use((config: any) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
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
				const response = await axios.get<IUserResponse>(`${API_URL}/refresh`, {
					withCredentials: true,
				})
				console.log(response);
				localStorage.setItem('token', response.data.accessToken)
				return api.request(originalRequest)
			} catch (error) {
				console.log(error)
			}
		}
		throw error
	}
)

export default api
