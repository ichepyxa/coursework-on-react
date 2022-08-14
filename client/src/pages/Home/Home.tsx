import React, { FC } from 'react'
import Advice from './components/Advice/Advice'
import Benefits from './components/Benefits/Benefits'
import FAQ from './components/FAQ/FAQ'
import Hero from './components/Hero/Hero'
import Map from './components/Map/Map'
import RecommendedHouses from './components/RecommendedHouses/RecommendedHouses'

import './style.css'

const Home: FC = () => {
	return (
		<>
			<Hero />
			<Benefits />
			<RecommendedHouses />
			<Advice />
			<Map />
			<FAQ />
		</>
	)
}

export default Home
