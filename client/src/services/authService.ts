import { AxiosResponse } from 'axios'

import api from '@src/lib/axios/index'
import { IUserResponse } from '@src/models'

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

	static async adminLogin(
		email: string,
		password: string
	): Promise<AxiosResponse<IUserResponse>> {
		return api.post<IUserResponse>('/admins/login', {
			email,
			password,
		})
	}
}
