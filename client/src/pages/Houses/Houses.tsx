import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import { API_URL } from '../../constants/apiUrl'
import { IHouse, IHouseResponse } from '../../models'
import { useAppDispatch } from '../../store/hook'
import Search from '../../components/Search/Search'
import Pagination from '../../components/Pagination/Pagination'
import { useSearchParams } from '../../hooks/useSearchParams'
import HousesElement from '../../components/HousesElement/HousesElement'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'

const Houses: FC = () => {
	const dispatch = useAppDispatch()
	const [houses, setHouses] = useState<IHouse[]>([])
	const [countPage, setCountPage] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { name, page, region } = useSearchParams()
	const pageHrefPath = 'houses'

	const getHouses = async () => {
		setIsLoading(true)
		try {
			await axios
				.get<IHouseResponse>(
					`${API_URL}/${pageHrefPath}?page=${page}&name=${name}&region=${region}`
				)
				.then(response => {
					if (
						response.data.houses === undefined ||
						response.data.houses === ([] as IHouse[])
					) {
						return setHouses([] as IHouse[])
					}

					setCountPage(response.data.count)
					setHouses(response.data.houses as IHouse[])
				})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouses()
	}, [page, name, region])

	return (
		<Container className="py-3">
			<h2 className="text-center mt-4">Места отдыха</h2>
			<Search pageHrefPath={pageHrefPath} />
			<DocumentTitle title={`${titleName} места отдыха`} />

			{isLoading ? (
				<Loader />
			) : houses.length > 0 ? (
				<>
					<HousesElement houses={houses} />
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

export default Houses
