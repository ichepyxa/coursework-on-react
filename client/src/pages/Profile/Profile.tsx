import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import HousesElement from '../../components/HousesElement/HousesElement'
import { useAuth } from '../../hooks/useAuth'
import { IHouse } from '../../models'

const Profile: FC = () => {
	const { email, username } = useAuth()
	const houses: IHouse[] = [
		{
			houseId: 1,
			name: 'fsag',
			category: 'fdisaknjриалтвыфь штоЛьлладвыф',
			location: 'gds',
			price: 3244,
			description: 'gsgfs',
			images: [],
			createdAt: '23fsa f',
			updatedAt: 'sagasggs',
		},
	]

	return (
		<Container className="d-md-flex gap-5 py-3">
			<nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
				<div className="d-flex align-items-center">
					<div className="toggle-icon-wrapper">
						<button
							className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
							data-bs-toggle="tooltip"
							data-bs-placement="left"
							aria-label="Toggle Navigation"
						>
							<span className="navbar-toggle-icon">
								<span className="toggle-line"></span>
							</span>
						</button>
					</div>
				</div>
				<div className="navbar-collapse collapse" id="navbarVerticalCollapse">
					<div className="navbar-vertical-content scrollbar">
						<ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav">
							<li className="nav-item">
								<a
									className="nav-link dropdown-indicator collapsed"
									href="#dashboard"
									role="button"
									aria-expanded="false"
									aria-controls="dashboard"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Dashboard</span>
									</div>
								</a>
								<ul className="nav collapse" id="dashboard">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../index.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Default</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../dashboard/analytics.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Analytics</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../dashboard/crm.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">CRM</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../dashboard/e-commerce.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">E commerce</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../dashboard/project-management.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Management</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../dashboard/saas.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">SaaS</span>
											</div>
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<div className="row navbar-vertical-label-wrapper mt-3 mb-2">
									<div className="col-auto navbar-vertical-label">App</div>
									<div className="col ps-0">
										<hr className="mb-0 navbar-vertical-divider" />
									</div>
								</div>
								<a
									className="nav-link"
									href="../../app/calendar.html"
									role="button"
									data-bs-toggle=""
									aria-expanded="false"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Calendar</span>
									</div>
								</a>
								<a
									className="nav-link"
									href="../../app/chat.html"
									role="button"
									data-bs-toggle=""
									aria-expanded="false"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Chat</span>
									</div>
								</a>
								<a
									className="nav-link dropdown-indicator"
									href="#email"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="true"
									aria-controls="email"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Email</span>
									</div>
								</a>
								<ul className="nav collapse show" id="email">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/email/inbox.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Inbox</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/email/email-detail.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Email detail</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/email/compose.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Compose</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link dropdown-indicator"
									href="#events"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="events"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Events</span>
									</div>
								</a>
								<ul className="nav collapse" id="events">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/events/create-an-event.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Create an event
												</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/events/event-detail.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Event detail</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/events/event-list.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Event list</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link dropdown-indicator"
									href="#e-commerce"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="e-commerce"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">E commerce</span>
									</div>
								</a>
								<ul className="nav collapse" id="e-commerce">
									<li className="nav-item">
										<a
											className="nav-link dropdown-indicator"
											href="#product"
											data-bs-toggle="collapse"
											aria-expanded="false"
											aria-controls="e-commerce"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Product</span>
											</div>
										</a>
										<ul className="nav collapse" id="product">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../app/e-commerce/product/product-list.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Product list
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../app/e-commerce/product/product-grid.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Product grid
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../app/e-commerce/product/product-details.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Product details
														</span>
													</div>
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item">
										<a
											className="nav-link dropdown-indicator"
											href="#orders"
											data-bs-toggle="collapse"
											aria-expanded="false"
											aria-controls="e-commerce"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Orders</span>
											</div>
										</a>
										<ul className="nav collapse" id="orders">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../app/e-commerce/orders/order-list.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Order list
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../app/e-commerce/orders/order-details.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Order details
														</span>
													</div>
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/e-commerce/customers.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Customers</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/e-commerce/customer-details.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Customer details
												</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/e-commerce/shopping-cart.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Shopping cart
												</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/e-commerce/checkout.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Checkout</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/e-commerce/billing.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Billing</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/e-commerce/invoice.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Invoice</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link"
									href="../../app/kanban.html"
									role="button"
									data-bs-toggle=""
									aria-expanded="false"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Kanban</span>
									</div>
								</a>
								<a
									className="nav-link dropdown-indicator"
									href="#social"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="social"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Social</span>
									</div>
								</a>
								<ul className="nav collapse" id="social">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/social/feed.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Feed</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/social/activity-log.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Activity log</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/social/notifications.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Notifications
												</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../app/social/followers.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Followers</span>
											</div>
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<div className="row navbar-vertical-label-wrapper mt-3 mb-2">
									<div className="col-auto navbar-vertical-label">Pages</div>
									<div className="col ps-0">
										<hr className="mb-0 navbar-vertical-divider" />
									</div>
								</div>
								<a
									className="nav-link"
									href="../../pages/starter.html"
									role="button"
									data-bs-toggle=""
									aria-expanded="false"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Starter</span>
									</div>
								</a>
								<a
									className="nav-link"
									href="../../pages/landing.html"
									role="button"
									data-bs-toggle=""
									aria-expanded="false"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Landing</span>
									</div>
								</a>
								<a
									className="nav-link dropdown-indicator"
									href="#authentication"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="authentication"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Authentication</span>
									</div>
								</a>
								<ul className="nav collapse" id="authentication">
									<li className="nav-item">
										<a
											className="nav-link dropdown-indicator"
											href="#simple"
											data-bs-toggle="collapse"
											aria-expanded="false"
											aria-controls="authentication"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Simple</span>
											</div>
										</a>
										<ul className="nav collapse" id="simple">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/simple/login.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Login</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/simple/logout.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Logout</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/simple/register.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Register</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/simple/forgot-password.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Forgot password
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/simple/confirm-mail.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Confirm mail
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/simple/reset-password.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Reset password
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/simple/lock-screen.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Lock screen
														</span>
													</div>
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item">
										<a
											className="nav-link dropdown-indicator"
											href="#card"
											data-bs-toggle="collapse"
											aria-expanded="false"
											aria-controls="authentication"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Card</span>
											</div>
										</a>
										<ul className="nav collapse" id="card">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/card/login.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Login</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/card/logout.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Logout</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/card/register.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Register</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/card/forgot-password.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Forgot password
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/card/confirm-mail.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Confirm mail
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/card/reset-password.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Reset password
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/card/lock-screen.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Lock screen
														</span>
													</div>
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item">
										<a
											className="nav-link dropdown-indicator"
											href="#split"
											data-bs-toggle="collapse"
											aria-expanded="false"
											aria-controls="authentication"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Split</span>
											</div>
										</a>
										<ul className="nav collapse" id="split">
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/split/login.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Login</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/split/logout.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Logout</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/split/register.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">Register</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/split/forgot-password.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Forgot password
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/split/confirm-mail.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Confirm mail
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/split/reset-password.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Reset password
														</span>
													</div>
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="../../pages/authentication/split/lock-screen.html"
													data-bs-toggle=""
													aria-expanded="false"
												>
													<div className="d-flex align-items-center">
														<span className="nav-link-text ps-1">
															Lock screen
														</span>
													</div>
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/authentication/wizard.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Wizard</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../#authentication-modal"
											data-bs-toggle="modal"
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Modal</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link dropdown-indicator"
									href="#user"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="user"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">User</span>
									</div>
								</a>
								<ul className="nav collapse" id="user">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/user/profile.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Profile</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/user/settings.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Settings</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link dropdown-indicator"
									href="#pricing"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="pricing"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Pricing</span>
									</div>
								</a>
								<ul className="nav collapse" id="pricing">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/pricing/pricing-default.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Pricing default
												</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/pricing/pricing-alt.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Pricing alt</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link dropdown-indicator"
									href="#faq"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="faq"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Faq</span>
									</div>
								</a>
								<ul className="nav collapse" id="faq">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/faq/faq-basic.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Faq basic</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/faq/faq-alt.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Faq alt</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/faq/faq-accordion.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Faq accordion
												</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link dropdown-indicator"
									href="#errors"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="errors"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Errors</span>
									</div>
								</a>
								<ul className="nav collapse" id="errors">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/errors/404.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">404</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/errors/500.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">500</span>
											</div>
										</a>
									</li>
								</ul>
								<a
									className="nav-link dropdown-indicator"
									href="#miscellaneous"
									role="button"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="miscellaneous"
								>
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"></span>
										<span className="nav-link-text ps-1">Miscellaneous</span>
									</div>
								</a>
								<ul className="nav collapse" id="miscellaneous">
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/miscellaneous/associations.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">Associations</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/miscellaneous/invite-people.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Invite people
												</span>
											</div>
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="../../pages/miscellaneous/privacy-policy.html"
											data-bs-toggle=""
											aria-expanded="false"
										>
											<div className="d-flex align-items-center">
												<span className="nav-link-text ps-1">
													Privacy policy
												</span>
											</div>
										</a>
									</li>
								</ul>
							</li>
						</ul>
						<div className="settings mb-3">
							<div className="alert card bg-white shadow-none p-0" role="alert">
								<div className="btn-close-falcon-container">
									<div
										className="btn-close-falcon"
										aria-label="Close"
										data-bs-dismiss="alert"
									></div>
								</div>
								<div className="text-center card-body">
									<img
										src="../../assets/img/icons/spot-illustrations/navbar-vertical.png"
										alt=""
										width="80"
									/>
									<p className="fs--2 mt-2">
										Loving what you see? <br />
										Get your copy of <a href="#!">Falcon</a>
									</p>
									<div className="d-grid">
										<a
											className="btn btn-sm btn-purchase"
											href="https://themes.getbootstrap.com/product/falcon-admin-dashboard-webapp-template/"
											target="_blank"
										>
											Purchase
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<div className="mb-3">
				<div className="userPanel-img mx-auto mb-2">
					<img src="/images/no-user-bg-img.png" alt="userImg" />
				</div>
				<div className="d-grid gap-3 mx-auto">
					<h3 className="text-center">{username}</h3>
				</div>
			</div>
			<div className="mb-3 w-100">
				<nav>
					<div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
						<button
							className="nav-link active"
							id="nav-home-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-profile"
							type="button"
							role="tab"
							aria-controls="nav-profile"
							aria-selected="true"
						>
							Профиль
						</button>
						<button
							className="nav-link"
							id="nav-profile-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-favorites"
							type="button"
							role="tab"
							aria-controls="nav-favorites"
							aria-selected="false"
						>
							Избранное
							{/* @if (Model.AllFavorites.Count() > 0) { <span className="badge bg-light text-dark rounded-pill align-text-bottom">@Model.AllFavorites.Count()</span> } */}
						</button>
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade active show"
						id="nav-profile"
						role="tabpanel"
						aria-labelledby="nav-profile-tab"
					>
						<div className="mb-3">
							<label htmlFor="inputEmail" className="form-label">
								Адрес электронной почты
							</label>
							<input
								type="email"
								className="form-control"
								id="inputEmail"
								aria-describedby="emailHelp"
								value={email}
								disabled
							/>
							<div id="emailHelp" className="form-text">
								Мы никому не передадим вашу электронную почту.
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="inputPassword" className="form-label">
								Пароль
							</label>
							<div className="input-group">
								<input
									type="password"
									className="form-control"
									id="inputPassword"
									value="********"
									disabled
								/>
								<div className="input-group-text">
									<a href="/account/changepassword" className="btn btn-danger">
										Сменить пароль
									</a>
								</div>
							</div>
						</div>
					</div>
					<div
						className="tab-pane fade"
						id="nav-favorites"
						role="tabpanel"
						aria-labelledby="nav-favorites-tab"
					>
						<HousesElement houses={houses} />
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Profile
