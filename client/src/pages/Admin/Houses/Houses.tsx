import React, { FC, useState } from 'react'
import { Container } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import Loader from '../../../components/Loader/Loader'
import Search from '../../../components/Search/Search'
import SidebarNavbarAdmin from '../../../components/SidebarNavbarAdmin/SidebarNavbarAdmin'
import { titleName } from '../../../constants/titleName'
import { IHouse } from '../../../models'

const Houses: FC = () => {
	// const dispatch = useAppDispatch(
	const [houses, setHouses] = useState<IHouse[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const pageHrefPath = 'admin/houses'

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
					<></>
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
