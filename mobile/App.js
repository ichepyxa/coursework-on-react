import { useEffect, useState } from 'react'
import Navigate from './navigate'
import Loader from './src/components/loader/Loader'
import fonts from './src/constants/fonts'
import { storeData } from './src/helpers/storage'

export default function App() {
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		fonts(() => setIsLoading(true))
		storeData(
			'token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6ItCc0LDQutGB0LjQvCIsImVtYWlsIjoibWF4aW0ua3J5dGl6bmFAZ21haWwuY29tIiwiYWN0aXZhdGlvbkxpbmsiOiI3NGZkMGFkMC01Y2M4LTRhZTQtYThlYy1mODJlYTc3ZTVlZTEiLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlzUGFzc2VkVGVzdCI6ZmFsc2UsImF2YXRhciI6IiIsInJvbGVJZCI6MSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY3NDc2NDMzMCwiZXhwIjoxNjc2MDYwMzMwfQ.l3uFt-_mIHbQ1b46oGigfRkWqntXy8EVP9JN0hx9rDY'
		)
	}, [])

	return !isLoading ? <Loader isLoading={isLoading} /> : <Navigate />
}
