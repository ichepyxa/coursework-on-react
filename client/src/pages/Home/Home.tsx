import { FC } from 'react'
import Advice from './components/Advice/Advice'
import Benefits from './components/Benefits/Benefits'
import FAQ from './components/FAQ/FAQ'
import Hero from './components/Hero/Hero'
import InteractiveMap from './components/InteractiveMap/InteractiveMap'
import RecommendedHouses from './components/RecommendedHouses/RecommendedHouses'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'

const Home: FC = () => {
	return (
		<>
			<DocumentTitle title={`${titleName} главная`} />
			<Hero />
			<Benefits />
			<RecommendedHouses />
			<Advice />
			<InteractiveMap />
			{/* <FAQ /> */}
		</>
	)
}

export default Home
