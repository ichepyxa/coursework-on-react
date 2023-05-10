import React, { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import SidebarNavbar from '@src/components/SidebarNavbar/SidebarNavbar'
import SightsElement from '@src/components/SightsElement/SightsElement'
import Loader from '@src/components/Loader/Loader'
import { ISight } from '@src/models'
import { useAppDispatch } from '@src/store/hook'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import SightsService from '@src/services/sightsService'

import './style.css'
import {titleName} from "@src/constants/titleName";
import DocumentTitle from "react-document-title";

const FavoritesSights: FC = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [sigths, setSights] = useState<ISight[]>([])

	const getSigths = async (): Promise<void> => {
		try {
			setIsLoading(true)
			await SightsService.getFavoritesSights().then(response => {
				if (
					response.data.sights === undefined ||
					response.data.sights === ([] as ISight[])
				) {
					return setSights([] as ISight[])
				}

				setSights(response.data.sights)
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect((): void => {
		getSigths()
	}, [])

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<SidebarNavbar />
			<DocumentTitle title={`${titleName} избранные достопримечательности`} />

			{isLoading ? (
				<Loader />
			) : sigths !== ([] as ISight[]) && sigths.length > 0 ? (
				<div className="mt-lg-4 w-100">
					<h3 className="text-center">Избранные достопримечательности</h3>
					<SightsElement sights={sigths} />
				</div>
			) : (
				<div className="w-100 d-flex justify-content-center align-items-center flex-column">
					<h2 className="mb-4 mt-lg-4 text-center mw-50 fs-4">
						У вас нет избранных достопримечательностей
					</h2>
					<Link
						to="/sights"
						className="houses__btn btn btn-outline-primary px-4"
					>
						Перейти к достопримечательностям
					</Link>
				</div>
			)}
		</Container>
	)
}

export default FavoritesSights
