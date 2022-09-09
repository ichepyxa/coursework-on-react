import React, { FC } from 'react'
import Advice from './components/Advice/Advice'
import Benefits from './components/Benefits/Benefits'
import FAQ from './components/FAQ/FAQ'
import Hero from './components/Hero/Hero'
import InteractiveMap from './components/InteractiveMap/InteractiveMap'
import RecommendedHouses from './components/RecommendedHouses/RecommendedHouses'

const Home: FC = () => {
	return (
		<>
			<Hero />
			<Benefits />
			<RecommendedHouses />
			<InteractiveMap />
			<Advice />
			<FAQ />
		</>
	)
}

export default Home
