import { AxiosResponse } from 'axios'

import api from '@src/lib/axios/index'
import {
	IBookingHouse,
	IBookingHouses,
	IHouse,
	IHousesFavoritesResponse,
	IHousesResponse,
	IHouseUpdateRequest,
} from '@src/models/index'

export default class HousesService {
	static async getHouses(
		page: number = 0
	): Promise<AxiosResponse<IHousesResponse>> {
		return api.get<IHousesResponse>(`/houses${page ? `?page=${page}` : ''}`)
	}

	static async getHousesByFilters(
		page: string | number = 0,
		name: string = '',
		region: string | number = 1
	): Promise<AxiosResponse<IHousesResponse>> {
		return api.get<IHousesResponse>(
			`/houses?page=${page}&name=${name}&region=${region}`
		)
	}

	static async getFavoritesHouses(): Promise<
		AxiosResponse<IHousesFavoritesResponse>
	> {
		return api.get<IHousesFavoritesResponse>('/houses/favoritesHouses')
	}

	static async getBookingHouses(): Promise<AxiosResponse<IBookingHouse[]>> {
		return api.get<IBookingHouse[]>('/houses/booking')
	}

	static async getAllBookingHouses(): Promise<AxiosResponse<IBookingHouses[]>> {
		return api.get<IBookingHouses[]>('/houses/allBooking')
	}

	static async getHouse(id: string): Promise<AxiosResponse<IHouse>> {
		return api.get<IHouse>(`/houses/${id}`)
	}

	static async getIsBooking(id: string): Promise<AxiosResponse<boolean>> {
		return api.get<boolean>(`/houses/isBooking/${id}`)
	}

	static async createHouse(data: FormData): Promise<AxiosResponse<IHouse>> {
		return api.post<IHouse>(`/houses`, data)
	}

	static async addFavoritesHouse(
		id: number
	): Promise<AxiosResponse<IHousesFavoritesResponse>> {
		return api.post<IHousesFavoritesResponse>(`/houses/favoritesHouses`, {
			houseId: id,
		})
	}

	static async addBookingHouse(data: {}): Promise<AxiosResponse<void>> {
		return api.post<void>(`/houses/booking`, data)
	}

	static async updateHouse(
		id: number,
		data: FormData
	): Promise<AxiosResponse<IHouseUpdateRequest>> {
		return api.put<IHouseUpdateRequest>(`/houses/${id}`, data)
	}

	static async updateBookingStatus(
		id: number,
		data: FormData
	): Promise<AxiosResponse<string>> {
		return api.put<string>(`/houses/booking/${id}`, data)
	}

	static async deleteHouse(id: number): Promise<AxiosResponse<void>> {
		return api.delete<void>(`/houses/${id}`)
	}

	static async deleteFavoritesHouse(id: number): Promise<AxiosResponse<void>> {
		return api.delete<void>(`/houses/favoritesHouses/${id}`)
	}
}
