import { AxiosResponse } from 'axios'

import api from '@src/lib/axios/index'
import {
	IAvatar,
	IChangeUsernameResponse,
	IUserResponse,
} from '@src/models'

export default class UsersService {
	static async getUsers(): Promise<AxiosResponse<IUserResponse>> {
		return api.get<IUserResponse>('/users')
	}

	static async refresh(): Promise<AxiosResponse<IUserResponse>> {
		return api.get<IUserResponse>('/users/refresh')
	}

	static async uploadAvatar(data: FormData): Promise<AxiosResponse<IAvatar>> {
		return api.post<IAvatar>('/users/uploadAvatar', data)
	}

	static async changePassword(passwords: {}): Promise<
		AxiosResponse<IUserResponse>
	> {
		return api.put<IUserResponse>('/users/changePassword', passwords)
	}

	static async changeUsername(
		username: string
	): Promise<AxiosResponse<IChangeUsernameResponse>> {
		return api.put<IChangeUsernameResponse>('/users/changeUsername', {
			username,
		})
	}

	static async toggleBanned(
		email: string
	): Promise<AxiosResponse<void>> {
		return api.put<void>('/users/toggleBanned', {
			email,
		})
	}

	static async deleteAvatar(): Promise<AxiosResponse<IAvatar>> {
		return api.delete<IAvatar>('/users/deleteAvatar')
	}
}
