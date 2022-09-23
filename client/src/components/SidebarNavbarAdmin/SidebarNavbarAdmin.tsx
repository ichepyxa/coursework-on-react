import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SidebarNavbarAdmin: FC = () => {
	const { pathname } = useLocation()

	const changeActiveLink = (path: string) => {
		if (pathname === '/admin' && path === '/admin') {
			return 'nav-link active'
		}

		return path === pathname ? 'nav-link active' : 'nav-link link-dark'
	}

	return (
		<div className="d-flex flex-column flex-shrink-0 p-4">
			<span className="fs-4">Админ панель</span>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link to="/admin" className={changeActiveLink('/admin')}>
						Основное
					</Link>
				</li>
				<li>
					<Link
						to="/admin/houses"
						className={changeActiveLink('/admin/houses')}
					>
						Места отдыха
					</Link>
				</li>
				<li>
					<Link
						to="/admin/sights"
						className={changeActiveLink('/admin/sights')}
					>
						Достопримечательности
					</Link>
				</li>
				<li>
					<Link
						to="/admin/booking"
						className={changeActiveLink('/admin/booking')}
					>
						Бронирование
					</Link>
				</li>
				<li>
					<Link to="/admin/users" className={changeActiveLink('/admin/users')}>
						Пользователи
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default SidebarNavbarAdmin
