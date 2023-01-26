import { AxiosResponse } from 'axios'

import api from '../helpers/axios'
import ISight from '../models/ISight'
import ISightsResponse from '../models/ISightsResponse'

export default class SightsService {
	static async getSights(
		page: number = 0
	): Promise<AxiosResponse<ISightsResponse>> {
		return api.get<ISightsResponse>(`/sights${page ? `?page=${page}` : ''}`)
	}

	static async getSightsByFilters(
		page: string | number = 0,
		name: string = '',
		region: string | number = 1
	): Promise<AxiosResponse<ISightsResponse>> {
		return api.get<ISightsResponse>(
			`/sights?page=${page}&name=${name}&region=${region}`
		)
	}

	static async getSight(id: string): Promise<AxiosResponse<ISight>> {
		return api.get<ISight>(`/sights/${id}`)
	}
}
