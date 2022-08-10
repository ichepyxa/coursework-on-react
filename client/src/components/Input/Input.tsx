import React, { FC } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

type InputProps = {
	controlId: string
	type: string
	label: string
	placeholder: string
	className: string
	value: string
	onChange: (e: any) => void
	required: boolean
}

const Input: FC<InputProps> = ({
	controlId,
	type,
	label,
	placeholder,
	className,
	value,
	onChange,
	required,
}) => {
	return (
		<>
			<FloatingLabel controlId={controlId} label={label}>
				<Form.Control
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					required={required}
					className={className}
				/>
			</FloatingLabel>
		</>
	)
}

export default Input
