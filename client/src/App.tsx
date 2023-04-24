import { FC } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Profile from './pages/Account/Profile/Profile'
import Register from './pages/Account/Register/Register'
import Login from './pages/Account/Login/Login'
import About from './pages/About/About'
import Houses from './pages/Houses/Houses'
import Test from './pages/Test/Test'
import NotFound from './pages/NotFound/NotFound'
import { useAppSelector } from './store/hook'
import HouseDescription from './pages/HouseDescription/HouseDescription'
import FavoritesHouses from './pages/Account/FavoritesHouses/FavoritesHouses'
import TestResult from './pages/Account/TestResult/TestResult'
import Booking from './components/Booking/Booking'
import Sights from './pages/Sights/Sights'
import SightDescription from './pages/SightDescription/SightDescription'
import UploadAvatar from './pages/Account/UploadAvatar/UploadAvatar'
import ChangeUsername from './pages/Account/ChangeUsername/ChangeUsername'
import ChangePassword from './pages/Account/ChangePassword/ChangePassword'
import LoginAdmin from './pages/Admin/LoginAdmin/LoginAdmin'
import { useAuth } from './hooks/useAuth'
import LayoutAdmin from './components/LayoutAdmin/LayoutAdmin'
import ProfileAdmin from './pages/Admin/ProfileAdmin/ProfileAdmin'
import FavoritesSights from './pages/Account/FavoritesSights/FavoritesSights'
import AdminHouses from './pages/Admin/Houses/Houses'
import CreateNewHouse from './pages/Admin/CreateNewHouse/CreateNewHouse'
import EditHouse from './pages/Admin/EditHouse/EditHouse'
import AdminSights from './pages/Admin/Sights/Sights'
import CreateNewSight from './pages/Admin/CreateNewSight/CreateNewSight'
import EditSight from './pages/Admin/EditSight/EditSight'
import Users from './pages/Admin/Users/Users'

import './App.css'

const App: FC = () => {
	const isAuth = useAppSelector(state => state.user.isAuth)
	const navigate = useNavigate()
	const { isAdmin } = useAuth()

	return (
		<Routes>
			<Route path="/admin" element={<LayoutAdmin />}>
				<Route
					index
					element={!isAuth || !isAdmin ? <LoginAdmin /> : <ProfileAdmin />}
				/>
				<Route
					path="changePassword"
					element={
						!isAuth || !isAdmin ? (
							<LoginAdmin />
						) : (
							<ChangePassword backPath={'/admin'} />
						)
					}
				/>
				<Route path="houses">
					<Route
						index
						element={!isAuth || !isAdmin ? <LoginAdmin /> : <AdminHouses />}
					/>
					<Route
						path="new"
						element={!isAuth || !isAdmin ? <LoginAdmin /> : <CreateNewHouse />}
					/>
					<Route path="edit">
						<Route
							index
							element={!isAuth || !isAdmin ? <LoginAdmin /> : <NotFound />}
						/>
						<Route
							path=":houseId"
							element={!isAuth || !isAdmin ? <LoginAdmin /> : <EditHouse />}
						/>
					</Route>
				</Route>
				<Route path="sights">
					<Route
						index
						element={!isAuth || !isAdmin ? <LoginAdmin /> : <AdminSights />}
					/>
					<Route
						path="new"
						element={!isAuth || !isAdmin ? <LoginAdmin /> : <CreateNewSight />}
					/>
					<Route path="edit">
						<Route
							index
							element={!isAuth || !isAdmin ? <LoginAdmin /> : <NotFound />}
						/>
						<Route
							path=":sightId"
							element={!isAuth || !isAdmin ? <LoginAdmin /> : <EditSight />}
						/>
					</Route>
				</Route>
				<Route path="users">
					<Route
						index
						element={!isAuth || !isAdmin ? <LoginAdmin /> : <Users />}
					/>
				</Route>
			</Route>
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
				{isAdmin ? (
					<></>
				) : (
					<>
						<Route path="test" element={!isAuth ? <Login /> : <Test />} />
						<Route path="account">
							<Route index element={!isAuth ? <Login /> : <Profile />} />
							<Route path="profile">
								<Route index element={!isAuth ? <Login /> : <Profile />} />
								<Route
									path="favoritesHouses"
									element={!isAuth ? <Login /> : <FavoritesHouses />}
								/>
								<Route
									path="favoritesSights"
									element={!isAuth ? <Login /> : <FavoritesSights />}
								/>
								<Route
									path="testResults"
									element={!isAuth ? <Login /> : <TestResult />}
								/>
								<Route
									path="booking"
									element={!isAuth ? <Login /> : <Booking />}
								/>
							</Route>
							<Route
								path="uploadAvatar"
								element={!isAuth ? <Login /> : <UploadAvatar />}
							/>
							<Route
								path="changePassword"
								element={
									!isAuth ? (
										<Login />
									) : (
										<ChangePassword backPath={'/account/profile'} />
									)
								}
							/>
							<Route
								path="changeUsername"
								element={!isAuth ? <Login /> : <ChangeUsername />}
							/>
							<Route
								path="registration"
								element={!isAuth ? <Register /> : <Profile />}
							/>
							<Route path="login" element={!isAuth ? <Login /> : <Profile />} />
						</Route>
					</>
				)}
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default App
