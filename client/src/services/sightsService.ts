import { AxiosResponse } from 'axios'

import api from '@src/lib/axios/index'
import {
	ISight,
	ISightsFavoritesResponse,
	ISightsResponse,
	ISightUpdateRequest,
} from '@src/models/index'

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

	static async getFavoritesSights(): Promise<
		AxiosResponse<ISightsFavoritesResponse>
	> {
		return api.get<ISightsFavoritesResponse>('/sights/favoritesSights')
	}

	static async getSight(id: string): Promise<AxiosResponse<ISight>> {
		return api.get<ISight>(`/sights/${id}`)
	}

	static async createSight(data: FormData): Promise<AxiosResponse<ISight>> {
		return api.post<ISight>(`/sights`, data)
	}

	static async addFavoritesSight(
		id: string
	): Promise<AxiosResponse<ISightsFavoritesResponse>> {
		return api.post<ISightsFavoritesResponse>(`/sights/favoritesSights`, {
			sightId: id,
		})
	}

	static async updateSight(
		id: number,
		data: FormData
	): Promise<AxiosResponse<ISightUpdateRequest>> {
		return api.put<ISightUpdateRequest>(`/sights/${id}`, data)
	}

	static async deleteSight(id: number): Promise<AxiosResponse<void>> {
		return api.delete<void>(`/sights/${id}`)
	}

	static async deleteFavoritesSight(id: string): Promise<AxiosResponse<void>> {
		return api.delete<void>(`/sights/favoritesSights/${id}`)
	}
}
