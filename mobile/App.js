import { useEffect, useState } from 'react'
import Navigate from './navigate'
import Loader from './src/components/loader/Loader'
import fonts from './src/constants/fonts'

export default function App() {
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		fonts(() => setIsLoading(true))
	}, [])

	return !isLoading ? <Loader isLoading={isLoading} /> : <Navigate />
}
