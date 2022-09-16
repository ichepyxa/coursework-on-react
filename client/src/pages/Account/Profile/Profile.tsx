import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SidebarNavbar from '../../../components/SidebarNavbar/SidebarNavbar'
import { API_DOMAIN } from '../../../constants/apiUrl'
import { useAuth } from '../../../hooks/useAuth'

import './style.css'

const Profile: FC = () => {
	const { email, username, avatar } = useAuth()

	return (
		<Container className="d-flex gap-5 py-3 flex-lg-row flex-column">
			<SidebarNavbar />
			<div className="mt-lg-4 text-center">
				<div className="mx-auto mb-2">
					<img
						className="avatar border-primary border border-2 rounded-circle"
						src={
							avatar ? `${API_DOMAIN}${avatar}` : '/images/no-user-bg-img.png'
						}
						alt="userImg"
					/>
				</div>
				<div className="d-grid gap-3 mx-auto">
					<h3 className="text-center mb-0">{username}</h3>
					<Link
						className="avatar-btn mx-auto btn btn-primary"
						to="/account/uploadAvatar"
					>
						Сменить фото
					</Link>
				</div>
			</div>
			<div className="mt-lg-4 w-100">
				<h2 className="text-center mb-4">Профиль</h2>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">
						Адрес электронной почты
					</label>
					<input
						type="email"
						className="form-control"
						id="inputEmail"
						aria-describedby="emailHelp"
						value={email}
						disabled
					/>
					<div id="emailHelp" className="form-text">
						Мы никому не передадим вашу электронную почту.
					</div>
				</div>

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
							<a href="/account/changepassword" className="btn btn-danger">
								Сменить пароль
							</a>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Profile
