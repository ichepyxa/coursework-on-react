import { FC } from 'react'
import { Nav, Navbar as NavbarElement, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import './style.css'
import {useAuth} from "@src/hooks/useAuth";

const Footer: FC = () => {
	const { pathname } = useLocation()
	const {isAdmin} = useAuth()

	return (
		<footer className="footer" id="footer">
			<NavbarElement
				variant="light"
				bg="white"
				className="border py-3 text-center"
			>
				<Container className="flex-column">
					<p className="w-100 copyright mb-1">
						&copy; 2021 - {new Date().getFullYear()} SearchHoliday
					</p>
					<Nav
						className="w-100 justify-content-center align-items-center flex-wrap gap-2"
						style={{ margin: '5px 0' }}
					>
						<Nav.Item className={pathname === '/' ? 'active' : ''}>
							<Link to="/" className="nav-link">
								Главная
							</Link>
						</Nav.Item>
						<Nav.Item className={pathname === '/sights' ? 'active' : ''}>
							<Link to="/sights" className="nav-link">
								Достопримечательности
							</Link>
						</Nav.Item>
						<Nav.Item className={pathname === '/houses' ? 'active' : ''}>
							<Link to="/houses" className="nav-link">
								Места отдыха
							</Link>
						</Nav.Item>
						{!isAdmin ? (
							<Nav.Item className={pathname === '/test' ? 'active' : ''}>
								<Link to="/test" className="nav-link">
									Тест
								</Link>
							</Nav.Item>
						) : (
							<></>
						)}

						<Nav.Item className={pathname === '/about' ? 'active' : ''}>
							<Link to="/about" className="nav-link">
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
