import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import HousesElement from '../../../components/HousesElement/HousesElement'
import Loader from '../../../components/Loader/Loader'
import Pagination from '../../../components/Pagination/Pagination'
import Search from '../../../components/Search/Search'
import SidebarNavbarAdmin from '../../../components/SidebarNavbarAdmin/SidebarNavbarAdmin'
import { titleName } from '../../../constants/titleName'
import { useHouses } from '../../../hooks/useHouses'

const Houses: FC = () => {
	const pageHrefPath = 'admin/houses'
	const { isLoading, houses, countPage } = useHouses()

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<DocumentTitle title={`${titleName} админ панель`} />
			<SidebarNavbarAdmin />
			<div className="mt-lg-4 w-100">
				<h2 className="text-center mb-4">Места отдыха</h2>
				<Search pageHrefPath={pageHrefPath} />

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
			</div>
		</Container>
	)
}

export default Houses
