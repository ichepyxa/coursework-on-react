import { AxiosResponse } from 'axios'

import api from '@src/lib/axios/index'
import { IHouse, IQuestion, ITest } from '@src/models/index'

export default class TestService {
	static async getTest(): Promise<AxiosResponse<ITest>> {
		return api.get<ITest>('/test')
	}

	static async sendAnswers(data: {}): Promise<AxiosResponse<IHouse[]>> {
		return api.post<IQuestion[], AxiosResponse<IHouse[]>>(`/test`, data)
	}
}
