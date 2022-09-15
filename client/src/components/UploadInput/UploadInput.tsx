import React, { FC } from 'react'
import { Form } from 'react-bootstrap'

const UploadInput: FC<{
	className: string | undefined
	label: string
	setValue: CallableFunction
	onChange: CallableFunction
}> = ({ className, label, setValue, onChange }) => {
	return (
		<Form.Group controlId="formFileLg" className={className}>
			<Form.Label>{label}</Form.Label>
			<Form.Control type="file" onChange={(e: any) => onChange(e, setValue)} />
		</Form.Group>
	)
}

export default UploadInput
