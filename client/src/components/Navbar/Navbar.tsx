import React, { FC } from 'react'
import {
	Nav,
	NavDropdown,
	Navbar as NavbarElement,
	Container,
} from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { changeUserAuth } from '../../store/slices/userSlice'
import { Link, useLocation } from 'react-router-dom'
import './style.css'

const Navbar: FC = () => {
	const isUserAuth: boolean = useAppSelector(state => state.user.user.isAuth)
	const dispatch = useAppDispatch()
	const loginAndLogout = () => dispatch(changeUserAuth(!isUserAuth))
	const { pathname } = useLocation()

	return (
		<header className='header' id='header'>
			<NavbarElement
				variant='light'
				expand='md'
				bg='white'
				className='border-bottom fixed-top'
			>
				<Container>
					<Link to='/' className='navbar-brand'>
						<img
							src='/images/horizontal-logo.png'
							height='40'
							className='d-inline-block align-top'
							alt='SearchHoliday Logo'
						/>
					</Link>
					<NavbarElement.Toggle aria-controls='navbarContent' />
					<NavbarElement.Collapse id='navbarContent'>
						<Nav
							className='me-auto w-100 align-items-md-center'
							style={{ margin: '5px 0' }}
						>
							<Nav.Item className={pathname === '/' ? 'active' : ''}>
								<Link to='/' className='nav-link'>
									Главная
								</Link>
							</Nav.Item>
							<Nav.Item className={pathname === '/houses' ? 'active' : ''}>
								<Link to='/houses' className='nav-link'>
									Места отдыха
								</Link>
							</Nav.Item>
							<Nav.Item className={pathname === '/test' ? 'active' : ''}>
								<Link to='/test' className='nav-link'>
									Тест
								</Link>
							</Nav.Item>
							<Nav.Item className={pathname === '/about' ? 'active' : ''}>
								<Link to='/about' className='nav-link'>
									О нас
								</Link>
							</Nav.Item>
							<div className='divider'></div>
							{isUserAuth ? (
								<>
									<NavDropdown
										className='ms-auto'
										title={
											<img
												src='/images/no-user-img.png'
												alt='user'
												width='32'
												height='32'
												className='rounded-circle me-2 d-inline'
											/>
										}
										id='navbarDropdown'
									>
										<Link className='dropdown-item' to='/account/profile'>
											Личный кабинет
										</Link>
										<NavDropdown.Divider />
										<NavDropdown.Item
											href='/account/logout'
											onClick={loginAndLogout}
										>
											Выйти
										</NavDropdown.Item>
									</NavDropdown>
									<Nav className='navbar-nav--mobile d-md-flex d-md-none'>
										<Nav.Item>
											<Link to='/account/profile' className='nav-link'>
												Личный кабинет
											</Link>
										</Nav.Item>
										<Nav.Item>
											<Link
												to='/account/logout'
												className='nav-link'
												onClick={loginAndLogout}
											>
												Выйти
											</Link>
										</Nav.Item>
									</Nav>
								</>
							) : (
								<Nav className='ms-md-auto d-flex flex-sm-column flex-md-row gap-2'>
									<Nav.Item>
										<Link
											className='nav-link btn btn-outline-primary w-100'
											to='/account/register'
										>
											Регистрация
										</Link>
									</Nav.Item>
									<Nav.Item>
										<Link
											className='nav-link btn btn-primary ms-md-3 w-100'
											to='/account/login'
											onClick={loginAndLogout}
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
