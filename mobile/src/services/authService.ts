import { AxiosResponse } from 'axios'

import api from '../helpers/axios'
import IUserResponse from '../models/IUserResponse'

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<IUserResponse>> {
		return api.post<IUserResponse>('/users/login', {
			email,
			password,
		})
	}

	static async registration(
		username: string,
		email: string,
		password: string
	): Promise<AxiosResponse<IUserResponse>> {
		return api.post<IUserResponse>('/users/registration', {
			username,
			email,
			password,
		})
	}

	static async logout(): Promise<void> {
		return api.get('/users/logout')
	}
}
