import React, { FC, useState } from 'react'
import { Nav, Navbar as NavbarElement, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import './style.css'

const Footer: FC = () => {
	const { pathname } = useLocation()

	return (
		<footer className='footer' id='footer'>
			<NavbarElement
				variant='light'
				bg='white'
				className='border py-3 text-center'
			>
				<Container className='flex-column'>
					<p className='w-100 copyright mb-1'>
						&copy; 2021 - 2022 SearchHoliday
					</p>
					<Nav
						className='w-100 justify-content-center align-items-center flex-wrap gap-2'
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
					</Nav>
				</Container>
			</NavbarElement>
		</footer>
	)
}

export default Footer
