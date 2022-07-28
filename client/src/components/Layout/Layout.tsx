import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const Layout: FC = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout
