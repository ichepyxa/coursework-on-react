import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import About from './pages/About/About'
import Houses from './pages/Houses/Houses'
import Test from './pages/Test/Test'
import NotFound from './pages/NotFound/NotFound'
import './App.css'

const App: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='houses' element={<Houses />} />
				<Route path='test' element={<Test />} />
			</Route>
			<Route path='account' element={<Layout />}>
				<Route index element={<Profile />} />
				<Route path='profile' element={<Profile />} />
				<Route path='register' element={<Register />} />
				<Route path='login' element={<Login />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
