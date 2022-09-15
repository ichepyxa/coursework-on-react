import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Profile from './pages/Account/Profile/Profile'
import Register from './pages/Account/Register/Register'
import Login from './pages/Account/Login/Login'
import About from './pages/About/About'
import Houses from './pages/Houses/Houses'
import Test from './pages/Test/Test'
import NotFound from './pages/NotFound/NotFound'
import './App.css'
import { useAppSelector } from './store/hook'
import HouseDescription from './pages/HouseDescription/HouseDescription'
import Favorites from './pages/Account/Favorites/Favorites'
import TestResult from './pages/Account/TestResult/TestResult'
import Booking from './components/Booking/Booking'
import Sights from './pages/Sights/Sights'
import SightDescription from './pages/SightDescription/SightDescription'
import UploadAvatar from './pages/Account/UploadAvatar/UploadAvatar'

const App: FC = () => {
	const isAuth = useAppSelector(state => state.user.isAuth)

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="houses">
					<Route index element={<Houses />} />
					<Route path=":houseId" element={<HouseDescription />} />
				</Route>
				<Route path="sights">
					<Route index element={<Sights />} />
					<Route path=":sightId" element={<SightDescription />} />
				</Route>
				<Route path="test" element={<Test />} />
				<Route path="account">
					<Route index element={!isAuth ? <Login /> : <Profile />} />
					<Route path="profile">
						<Route index element={!isAuth ? <Login /> : <Profile />} />
						<Route
							path="favorites"
							element={!isAuth ? <Login /> : <Favorites />}
						/>
						<Route path="test" element={!isAuth ? <Login /> : <TestResult />} />
						<Route path="booking" element={!isAuth ? <Login /> : <Booking />} />
					</Route>
					<Route
						path="uploadAvatar"
						element={!isAuth ? <Login /> : <UploadAvatar />}
					/>
					<Route
						path="changepassword"
						element={!isAuth ? <Login /> : <Profile />}
					/>
					<Route
						path="registration"
						element={!isAuth ? <Register /> : <Profile />}
					/>
					<Route path="login" element={!isAuth ? <Login /> : <Profile />} />
				</Route>
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default App
