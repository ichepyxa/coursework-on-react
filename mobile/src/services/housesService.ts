import { AxiosResponse } from 'axios'

import api from '../helpers/axios'
import IHouse from '../models/IHouse'
import IHousesResponse from '../models/IHousesResponse'

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

	static async getHouse(id: string): Promise<AxiosResponse<IHouse>> {
		return api.get<IHouse>(`/houses/${id}`)
	}

	static async getIsBooking(id: string): Promise<AxiosResponse<boolean>> {
		return api.get<boolean>(`/houses/isBooking/${id}`)
	}

	static async addBookingHouse(data: {}): Promise<AxiosResponse<void>> {
		return api.post<void>(`/houses/booking`, data)
	}
}
