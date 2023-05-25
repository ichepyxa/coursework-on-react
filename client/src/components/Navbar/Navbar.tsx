import {FC, useEffect, useState} from 'react'
import {
  Nav,
  NavDropdown,
  Navbar as NavbarElement,
  Container,
} from 'react-bootstrap'
import {Link, useLocation} from 'react-router-dom'

import AuthService from '@src/services/authService'
import {useAppDispatch} from '@src/store/hook'
import {setIsAuth, setUser} from '@src/store/slices/userSlice'
import {setIsLoading} from '@src/store/slices/pageSlice'
import {IUser} from '@src/models'
import displayTroubleConnectionError from '@src/helpers/displayTroubleConnectionError'
import {useAuth} from '@src/hooks/useAuth'
import {API_DOMAIN} from '@src/constants/apiUrl'
import displaySuccess from '@src/helpers/displaySuccess'

import './style.css'

const Navbar: FC = () => {
  const dispatch = useAppDispatch()
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true)
  const {isAuth, avatar, isAdmin} = useAuth()
  const {pathname} = useLocation()

  const handleLogout = async (): Promise<void> => {
    handleCloseMenu()
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

  const handleCloseMenu = (): void => {
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
          <Link
            to="/"
            className="navbar-brand d-flex justify-content-center align-items-center gap-2"
            onClick={handleCloseMenu}
          >
            <img
              src="/images/horizontal-logo(without-bg).png"
              height="40"
              className="d-inline-block align-top"
              alt="SearchHoliday Logo"
            />
          </Link>
          <NavbarElement.Toggle aria-controls="navbarContent"/>
          <NavbarElement.Collapse id="navbarContent">
            <Nav
              className="me-auto w-100 align-items-lg-center"
              style={{margin: '5px 0'}}
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
              {!isAdmin ? (
                <Nav.Item
                  className={pathname === '/test' ? 'active' : ''}
                  onClick={handleCloseMenu}
                >
                  <Link to="/test" className="nav-link">
                    Тест
                  </Link>
                </Nav.Item>
              ) : (
                <></>
              )}
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
                isAdmin ? (
                  <Nav className="ms-lg-auto d-flex flex-md-column flex-lg-row gap-2">
                    <Nav.Item onClick={handleCloseMenu}>
                      <Link className="nav-link w-100" to="/admin">
                        Админ панель
                      </Link>
                    </Nav.Item>
                  </Nav>
                ) : (
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
                      <NavDropdown.Divider/>
                      <NavDropdown.Item
                        className="text-danger"
                        onClick={handleLogout}
                      >
                        Выйти
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav className="navbar-nav--mobile d-lg-flex d-lg-none">
                      <Nav.Item onClick={handleCloseMenu}>
                        <Link to="/account/profile" className="nav-link">
                          Личный кабинет
                        </Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          className="text-danger"
                          onClick={handleLogout}
                        >
                          Выйти
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </>
                )
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
