import React, { FC } from 'react'
import { Nav, Navbar as NavbarElement, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.css'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { setIsAuth, setIsLoading, setUser } from '../../store/slices/userSlice'
import AuthService from '../../sevices/authService'
import { IUser } from '../../models/index'
import { setNotification } from '../../store/slices/notificationSlice'
import displayTroubleConnectionError from '../../helpers/displayTroubleConnectionError'

const NavbarAdmin: FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.user)
	const { isAuth, isAdmin } = useAuth()

	const handleLogout = async () => {
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

	return (
		<header className="header" id="header">
			<NavbarElement
				variant="light"
				expand="lg"
				bg="white"
				className="border-bottom fixed-top"
			>
				<Container>
					<Link to="/" className="navbar-brand">
						<img
							src="/images/horizontal-logo(without-bg).png"
							height="40"
							className="d-inline-block align-top"
							alt="SearchHoliday Logo"
						/>
					</Link>
					{isAuth && isAdmin ? (
						isLoading ? (
							<div className="dot-flashing ms-lg-auto me-lg-0 my-4 my-lg-0 mx-auto"></div>
						) : (
							<>
								<Nav className="navbar-nav d-flex">
									<Nav.Item>
										<Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
									</Nav.Item>
								</Nav>
							</>
						)
					) : (
						<></>
					)}
				</Container>
			</NavbarElement>
		</header>
	)
}

export default NavbarAdmin
