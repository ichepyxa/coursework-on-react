import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import HousesElementAdmin from '../../../components/HousesElementAdmin/HousesElementAdmin'
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
			<div className="mt-lg-4 w-100 position-relative">
				<h2 className="text-center mb-4 word-break">Места отдыха</h2>
				<Link
					to="new"
					className="d-flex align-items-center gap-2 text-decoration-none position-absolute end-0 top-0"
				>
					<span className="d-sm-block d-none">Создать</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-circle-plus"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<circle cx="12" cy="12" r="9"></circle>
						<line x1="9" y1="12" x2="15" y2="12"></line>
						<line x1="12" y1="9" x2="12" y2="15"></line>
					</svg>
				</Link>
				<Search pageHrefPath={pageHrefPath} />

				{isLoading ? (
					<Loader />
				) : houses.length > 0 ? (
					<>
						<HousesElementAdmin houses={houses} />
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
