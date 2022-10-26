import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader'
import Search from '../../../components/Search/Search'
import SidebarNavbarAdmin from '../../../components/SidebarNavbarAdmin/SidebarNavbarAdmin'
import UsersElementAdmin from '../../../components/UsersElementAdmin/UsersElementAdmin'
import { titleName } from '../../../constants/titleName'
import { useUsers } from '../../../hooks/useUsers'

const Users: FC = () => {
	const pageHrefPath = 'admin/users'
	const { isLoading, users } = useUsers()

	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<DocumentTitle title={`${titleName} админ панель`} />
			<SidebarNavbarAdmin />
			<div className="mt-lg-4 w-100 position-relative">
				<h2 className="text-center mb-4 word-break">Пользователи</h2>
				<Search pageHrefPath={pageHrefPath} />

				{isLoading ? (
					<Loader />
				) : users.length > 0 ? (
					<>
						<UsersElementAdmin users={users} />
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

export default Users
