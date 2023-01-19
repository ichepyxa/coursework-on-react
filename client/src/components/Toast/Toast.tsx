import { useState } from 'react'
import { Toast as ToastElement } from 'react-bootstrap'

import { useAppDispatch } from '@src/store/hook'
import { setNotification } from '@src/store/slices/notificationSlice'
import { NotificationState } from '@src/models'

import './style.css'

const Toast = ({
	message,
	isError,
	isVisible = true,
}: {
	message: string | undefined
	isError: boolean
	isVisible: boolean
}) => {
	const dispatch = useAppDispatch()
	const [isShow, setIsShow] = useState<boolean>(isVisible)

	const onClose = (): void => {
		setIsShow(false)
		dispatch(setNotification({} as NotificationState))
	}

	return (
		<ToastElement
			show={isShow}
			onClose={onClose}
			delay={3000}
			bg={isError ? 'danger' : 'success'}
			autohide
			animation={true}
		>
			<ToastElement.Body className="text-white">{message}</ToastElement.Body>
		</ToastElement>
	)
}

export default Toast
