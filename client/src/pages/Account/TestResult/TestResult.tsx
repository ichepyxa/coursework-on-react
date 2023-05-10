import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import HousesElement from '../../../components/HousesElement/HousesElement'
import SidebarNavbar from '../../../components/SidebarNavbar/SidebarNavbar'
import { IHouse } from '@src/models'
import { useAppDispatch } from '@src/store/hook'
import TestService from '@src/services/testService'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import Loader from '@src/components/Loader/Loader'
import { Link } from 'react-router-dom'
import {titleName} from "@src/constants/titleName";
import DocumentTitle from "react-document-title";

const TestResult: FC = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [houses, setHouses] = useState<IHouse[]>([])

	const getResults = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await TestService.getSaveResults().then(response => {
				if (response.data === undefined || response.data === ([] as IHouse[])) {
					return setHouses([] as IHouse[])
				}

				setHouses(response.data)
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect((): void => {
		getResults()
	}, [])

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<SidebarNavbar />
			<DocumentTitle title={`${titleName} результаты теста`} />

			{isLoading ? (
				<Loader />
			) : houses !== ([] as IHouse[]) && houses.length > 0 ? (
				<div className="mt-lg-4 w-100">
					<h2 className="text-center">Результаты теста</h2>
					<HousesElement houses={houses} />
				</div>
			) : (
				<div className="w-100 d-flex justify-content-center align-items-center flex-column">
					<h2 className="mb-4 mt-lg-4 text-center mw-50 fs-4">
						Вы еще не проходили тест
					</h2>
					<Link to="/test" className="houses__btn btn btn-outline-primary px-4">
						Перейти к тесту
					</Link>
				</div>
			)}
		</Container>
	)
}

export default TestResult
