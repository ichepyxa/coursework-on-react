import { AxiosResponse } from 'axios'

import api from '../helpers/axios'
import ITest from '../models/ITest'
import IQuestion from '../models/IQuestion'
import IHouse from '../models/IHouse'

export default class TestService {
	static async getTest(): Promise<AxiosResponse<ITest>> {
		return api.get<ITest>('/test')
	}

	static async sendAnswers(data: {}): Promise<AxiosResponse<IHouse[]>> {
		return api.post<IQuestion[], AxiosResponse<IHouse[]>>(`/test`, data)
	}
}
