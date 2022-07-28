import React, { FC } from 'react'
import './App.css'
import { Button } from 'react-bootstrap'

const App: FC = () => {
	return (
		<Button variant='danger' onClick={e => console.log(e)}>
			Hello world!
		</Button>
	)
}

export default App
