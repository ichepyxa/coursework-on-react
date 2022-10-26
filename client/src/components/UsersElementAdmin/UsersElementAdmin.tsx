import React, { FC } from 'react'
import { IUserAdmin } from '../../models/index'
import UserAdmin from '../UserAdmin/UserAdmin'

type UsersElementAdminProps = {
	users: IUserAdmin[]
}

const UsersElementAdmin: FC<UsersElementAdminProps> = ({ users }) => {
	return (
		<>
			<div className="houses d-md-flex align-items-center justify-content-center flex-wrap">
				<ul className="mt-lg-3 w-100 p-0">
					<div className="list-group">
						{users.map((user: IUserAdmin) => (
							<UserAdmin key={user.userId} {...user} />
						))}
					</div>
				</ul>
			</div>
		</>
	)
}

export default UsersElementAdmin
