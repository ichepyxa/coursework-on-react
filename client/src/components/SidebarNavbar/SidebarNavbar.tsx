import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SidebarNav: FC = () => {
	const { pathname } = useLocation()

	const changeActiveLink = (path: string) => {
		if (
			path === '/account/profile' &&
			(pathname === '/account/login' ||
				pathname === '/account/registration' ||
				pathname === '/account' ||
				pathname === '/account/profile/')
		) {
			return 'nav-link active'
		}

		return path === pathname ? 'nav-link active' : 'nav-link link-dark'
	}

	return (
		<div className="d-flex flex-column flex-shrink-0 p-4">
			<span className="fs-4">Личный кабинет</span>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link
						to="/account/profile"
						className={changeActiveLink('/account/profile')}
					>
						Профиль
					</Link>
				</li>
				<li>
					<Link
						to="/account/profile/favoritesHouses"
						className={changeActiveLink('/account/profile/favoritesHouses')}
					>
						Места отдыха
					</Link>
				</li>
				<li>
					<Link
						to="/account/profile/favoritesSights"
						className={changeActiveLink('/account/profile/favoritesSights')}
					>
						Достопримечательности
					</Link>
				</li>
				<li>
					<Link
						to="/account/profile/testResults"
						className={changeActiveLink('/account/profile/testResults')}
					>
						Результаты теста
					</Link>
				</li>
				<li>
					<Link
						to="/account/profile/booking"
						className={changeActiveLink('/account/profile/booking')}
					>
						Бронирование
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default SidebarNav
