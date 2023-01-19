import { FC } from 'react'
import { Container } from 'react-bootstrap'
import Loader from '../../components/Loader/Loader'
import Search from '../../components/Search/Search'
import Pagination from '../../components/Pagination/Pagination'
import SightsElement from '../../components/SightsElement/SightsElement'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'
import { useSights } from '../../hooks/useSights'

const Sights: FC = () => {
	const { isLoading, sights, countPage } = useSights()
	const pageHrefPath = 'sights'

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
