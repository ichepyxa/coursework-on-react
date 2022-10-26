import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'

import { titleName } from '../../../constants/titleName'
import SidebarNavbarAdmin from '../../../components/SidebarNavbarAdmin/SidebarNavbarAdmin'

const ProfileAdmin: FC = () => {
	return (
		<Container className="d-flex gap-5 py-4 flex-lg-row flex-column">
			<DocumentTitle title={`${titleName} админ панель`} />
			<SidebarNavbarAdmin />
			<div className="mt-lg-4 w-100">
				<h2 className="text-center mb-4">Основное</h2>
				<div className="mb-3">
					<label htmlFor="inputPassword" className="form-label">
						Пароль
					</label>
					<div className="input-group">
						<input
							type="password"
							className="form-control"
							id="inputPassword"
							value="********"
							disabled
						/>
						<div className="input-group-text">
							<a href="/admin/changePassword" className="btn btn-danger">
								Сменить пароль
							</a>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default ProfileAdmin
