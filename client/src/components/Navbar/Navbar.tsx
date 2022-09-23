import React, { FC, useEffect, useState } from 'react'
import {
	Nav,
	NavDropdown,
	Navbar as NavbarElement,
	Container,
} from 'react-bootstrap'
import AuthService from '../../sevices/authService'
import { useAppDispatch } from '../../store/hook'
import { setIsAuth, setIsLoading, setUser } from '../../store/slices/userSlice'
import { IUser } from '../../models'
import { Link, useLocation } from 'react-router-dom'
import { setNotification } from '../../store/slices/notificationSlice'
import './style.css'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'
import { useAuth } from '../../hooks/useAuth'
import { API_DOMAIN } from '../../constants/apiUrl'

const Navbar: FC = () => {
	const dispatch = useAppDispatch()
	const [pageIsLoading, setPageIsLoading] = useState<boolean>(true)
	const { isAuth, avatar, isAdmin } = useAuth()
	const { pathname } = useLocation()

	const handleLogout = async () => {
		handleCloseMenu()
		dispatch(setIsLoading(true))
		try {
			await AuthService.logout().then(() => {
				localStorage.removeItem('token')
				dispatch(setUser({} as IUser))
				dispatch(setIsAuth(false))
				dispatch(
					setNotification({
						message: 'Вы вышли из аккаунта',
						isError: false,
						errors: [],
					})
				)
			})
		} catch (error: any) {
			displayTroubleConnectionError(dispatch, error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	const handleCloseMenu = () => {
		const navbarToggler: HTMLElement = document.querySelector(
			'.navbar-toggler'
		) as HTMLElement
		const navbarContent: HTMLElement = document.querySelector(
			'#navbarContent'
		) as HTMLElement

		if (navbarContent?.classList.contains('show') && navbarToggler !== null) {
			navbarToggler.click()
		}
	}

	useEffect(() => {
		setPageIsLoading(false)
	}, [isAuth])

	return (
		<header className="header" id="header">
			<NavbarElement
				variant="light"
				expand="lg"
				bg="white"
				className="border-bottom fixed-top"
			>
				<Container>
					<Link to="/" className="navbar-brand" onClick={handleCloseMenu}>
						<img
							src="/images/horizontal-logo(without-bg).png"
							height="40"
							className="d-inline-block align-top"
							alt="SearchHoliday Logo"
						/>
					</Link>
					<NavbarElement.Toggle aria-controls="navbarContent" />
					<NavbarElement.Collapse id="navbarContent">
						<Nav
							className="me-auto w-100 align-items-lg-center"
							style={{ margin: '5px 0' }}
						>
							<Nav.Item
								className={pathname === '/' ? 'active' : ''}
								onClick={handleCloseMenu}
							>
								<Link to="/" className="nav-link">
									Главная
								</Link>
							</Nav.Item>
							<Nav.Item
								className={pathname === '/sights' ? 'active' : ''}
								onClick={handleCloseMenu}
							>
								<Link to="/sights" className="nav-link">
									Достопримечательности
								</Link>
							</Nav.Item>
							<Nav.Item
								className={pathname === '/houses' ? 'active' : ''}
								onClick={handleCloseMenu}
							>
								<Link to="/houses" className="nav-link">
									Места отдыха
								</Link>
							</Nav.Item>
							<Nav.Item
								className={pathname === '/test' ? 'active' : ''}
								onClick={handleCloseMenu}
							>
								<Link to="/test" className="nav-link">
									Тест
								</Link>
							</Nav.Item>
							<Nav.Item
								className={pathname === '/about' ? 'active' : ''}
								onClick={handleCloseMenu}
							>
								<Link to="/about" className="nav-link">
									О нас
								</Link>
							</Nav.Item>
							<div className="divider"></div>
							{pageIsLoading ? (
								<div className="dot-flashing ms-lg-auto me-lg-0 my-4 my-lg-0 mx-auto"></div>
							) : isAuth ? (
								<>
									<NavDropdown
										className="ms-auto"
										title={
											<img
												src={
													avatar
														? `${API_DOMAIN}${avatar}`
														: '/images/no-user-bg-img.png'
												}
												alt="user"
												width="32"
												height="32"
												className="rounded-circle me-2 d-inline"
											/>
										}
										id="navbarDropdown"
									>
										<Link
											className="dropdown-item"
											to="/account/profile"
											onClick={handleCloseMenu}
										>
											Личный кабинет
										</Link>
										{isAdmin ? (
											<Link
												className="dropdown-item"
												to="/admin"
												onClick={handleCloseMenu}
											>
												Админ панель
											</Link>
										) : (
											<></>
										)}
										<NavDropdown.Divider />
										<NavDropdown.Item onClick={handleLogout}>
											Выйти
										</NavDropdown.Item>
									</NavDropdown>
									<Nav className="navbar-nav--mobile d-lg-flex d-lg-none">
										<Nav.Item onClick={handleCloseMenu}>
											<Link to="/account/profile" className="nav-link">
												Личный кабинет
											</Link>
										</Nav.Item>
										{isAdmin ? (
											<Nav.Item onClick={handleCloseMenu}>
												<Link to="/admin" className="nav-link">
													Админ панель
												</Link>
											</Nav.Item>
										) : (
											<></>
										)}
										<Nav.Item>
											<Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
										</Nav.Item>
									</Nav>
								</>
							) : (
								<Nav className="ms-lg-auto d-flex flex-md-column flex-lg-row gap-2">
									<Nav.Item onClick={handleCloseMenu}>
										<Link
											className="nav-link btn btn-outline-primary w-100"
											to="/account/registration"
										>
											Регистрация
										</Link>
									</Nav.Item>
									<Nav.Item onClick={handleCloseMenu}>
										<Link
											className="nav-link btn btn-primary ms-lg-3 w-100"
											to="/account/login"
										>
											Вход
										</Link>
									</Nav.Item>
								</Nav>
							)}
						</Nav>
					</NavbarElement.Collapse>
				</Container>
			</NavbarElement>
		</header>
	)
}

export default Navbar
