import React, { FC, useState } from 'react'
import {
	Nav,
	NavDropdown,
	Navbar as NavbarElement,
	Container,
} from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import './style.css'

const Navbar: FC = () => {
	const [isUserAuth, setIsUserAuth] = useState(false)
	const { pathname } = useLocation()

	return (
		<header className='header' id='header'>
			<NavbarElement
				variant='light'
				expand='md'
				bg='white'
				className='border-bottom sticky-top'
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
										<NavDropdown.Item href='/account/profile'>
											Личный кабинет
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href='/account/logout'>
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
											<Link to='/account/logout' className='nav-link'>
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
