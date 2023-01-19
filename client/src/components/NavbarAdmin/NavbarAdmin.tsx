import { FC } from 'react'
import { Nav, Navbar as NavbarElement, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '@src/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '@src/store/hook'
import { setIsAuth, setUser } from '@src/store/slices/userSlice'
import { setIsLoading } from '@src/store/slices/pageSlice'
import AuthService from '@src/services/authService'
import { IUser } from '@src/models/index'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import displaySuccess from '@src/helpers/displaySuccess'

import './style.css'

const NavbarAdmin: FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.page)
	const { isAuth, isAdmin } = useAuth()

	const handleLogout = async () => {
		try {
			dispatch(setIsLoading(true))
			await AuthService.logout().then(() => {
				localStorage.removeItem('token')
				dispatch(setUser({} as IUser))
				dispatch(setIsAuth(false))
				displaySuccess(dispatch, 'Вы вышли из аккаунта')
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
										<Nav.Link className="text-danger" onClick={handleLogout}>
											Выйти
										</Nav.Link>
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
