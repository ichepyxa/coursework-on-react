import React, { FC } from 'react'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'

const Test: FC = () => {
	return (
		<>
			<DocumentTitle title={`${titleName} тест`} />
			<div>Test</div>
		</>
	)
}

export default Test
