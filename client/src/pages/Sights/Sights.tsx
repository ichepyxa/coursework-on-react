import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { ISight, ISightsResponse } from '../../models/index'
import { useAppDispatch } from '../../store/hook'
import Search from '../../components/Search/Search'
import Pagination from '../../components/Pagination/Pagination'
import { useSearchParams } from '../../hooks/useSearchParams'
import SightsElement from '../../components/SightsElement/SightsElement'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'

const Sights: FC = () => {
	const dispatch = useAppDispatch()
	const [sights, setSights] = useState<ISight[]>([])
	const [countPage, setCountPage] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { name, page, region } = useSearchParams()
	const pageHrefPath = 'sights'

	const getSights = async () => {
		setIsLoading(true)
		try {
			await axios
				.get<ISightsResponse>(
					`${API_URL}/${pageHrefPath}?page=${page}&name=${name}&region=${region}`
				)
				.then(response => {
					if (
						response.data.sights === undefined ||
						response.data.sights === ([] as ISight[])
					) {
						return setSights([] as ISight[])
					}

					setCountPage(response.data.count)
					setSights(response.data.sights as ISight[])
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getSights()
	}, [page, name, region])

	return (
		<Container className="py-3">
			<h2 className="text-center mt-4">Достопримечательности</h2>
			<Search pageHrefPath={pageHrefPath} />
			<DocumentTitle title={`${titleName} достопримечательности`} />

			{isLoading ? (
				<Loader />
			) : sights.length > 0 ? (
				<>
					<SightsElement sights={sights} />
					<Pagination pageHrefPath={pageHrefPath} countPage={countPage} />
				</>
			) : (
				<>
					<h4 className="mt-5 text-center">
						К сожалению, по вашему запросу ничего не найдено.
					</h4>
					<h6 className="text-center">
						Попробуйте уменьшить количество параметров подбора.
					</h6>
				</>
			)}
		</Container>
	)
}

export default Sights
