import React, { FC } from 'react'
import Benefits from './components/Benefits/Benefits'
import Hero from './components/Hero/Hero'
import RecommendedHouses from './components/RecommendedHouses/RecommendedHouses'

import './style.css'

const Home: FC = () => {
	return (
		<>
			<Hero />
			<Benefits />
			<RecommendedHouses />
		</>
	)
}

export default Home
