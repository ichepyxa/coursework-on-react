import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import Search from '../../components/Search/Search'
import Pagination from '../../components/Pagination/Pagination'
import HousesElement from '../../components/HousesElement/HousesElement'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'
import { useHouses } from '../../hooks/useHouses'

const Houses: FC = () => {
	const { isLoading, houses, countPage } = useHouses()
	const pageHrefPath = 'houses'

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
