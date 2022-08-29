import React, { FC } from 'react'
import { Pagination as PaginationElement } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import './style.css'

const Pagination: FC<{ countPage: number }> = ({ countPage }) => {
	const { search } = useLocation()

	const urlParams = new URLSearchParams(search)

	const maxPage = countPage
	let currentPage = urlParams.get('page') ?? 1
	currentPage = currentPage === '' ? 1 : currentPage

	return (
		<PaginationElement className="d-flex align-items-center justify-content-center">
			{currentPage <= 3 ? (
				<></>
			) : (
				<PaginationElement.Item href="/houses?page=1">1</PaginationElement.Item>
			)}
			{currentPage < 5 ? <></> : <PaginationElement.Ellipsis disabled />}

			{currentPage < 3 ? (
				<></>
			) : (
				<PaginationElement.Item href={`/houses?page=${+currentPage - 2}`}>
					{+currentPage - 2}
				</PaginationElement.Item>
			)}

			{currentPage < 2 ? (
				<></>
			) : (
				<PaginationElement.Item href={`/houses?page=${+currentPage - 1}`}>
					{+currentPage - 1}
				</PaginationElement.Item>
			)}

			<PaginationElement.Item active>{currentPage}</PaginationElement.Item>

			{currentPage >= maxPage - 1 ? (
				<></>
			) : (
				<PaginationElement.Item href={`/houses?page=${+currentPage + 1}`}>
					{+currentPage + 1}
				</PaginationElement.Item>
			)}
			{currentPage >= maxPage - 2 ? (
				<></>
			) : (
				<PaginationElement.Item href={`/houses?page=${+currentPage + 2}`}>
					{+currentPage + 2}
				</PaginationElement.Item>
			)}

			{maxPage - 3 <= currentPage ? (
				<></>
			) : (
				<PaginationElement.Ellipsis disabled />
			)}

			{currentPage >= maxPage ? (
				<></>
			) : (
				<PaginationElement.Item href={`/houses?page=${maxPage}`}>
					{maxPage}
				</PaginationElement.Item>
			)}
		</PaginationElement>
	)
}

export default Pagination
