import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { titleName } from '../../constants/titleName'

const NotFound: FC = () => {
	return (
		<div className="d-flex justify-content-center align-items-center w-100 vh-100 flex-column overflow-hidden">
			<DocumentTitle title={`${titleName} страница не найдена`} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				fill="currentColor"
				className="bi bi-exclamation-circle"
				viewBox="0 0 16 16"
			>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
				<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
			</svg>
			<h2 className="mb-5 mt-3 text-center mw-50">Страница не найдена</h2>
			<Link to="/" className="btn btn-outline-primary px-4">
				Перейти на главную
			</Link>
		</div>
	)
}

export default NotFound
