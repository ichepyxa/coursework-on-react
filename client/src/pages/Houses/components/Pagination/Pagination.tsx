import React, { FC } from 'react'
import { Pagination as PaginationElement } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import createHref from '../../../../helpers/createHref'
import { useSearchParams } from '../../../../hooks/useSearchParams'

import './style.css'

const Pagination: FC<{ countPage: number }> = ({ countPage }) => {
	const navigate = useNavigate()

	const { name, page, region } = useSearchParams()
	const newUrl = (page: number) => createHref(page, name, region)
	const paginationItemClick = (href: string) => navigate(href)

	return (
		<PaginationElement className="d-flex align-items-center justify-content-center mt-5">
			{page <= 3 ? (
				<></>
			) : (
				<PaginationElement.Item onClick={() => paginationItemClick(newUrl(1))}>
					1
				</PaginationElement.Item>
			)}
			{page < 5 ? <></> : <PaginationElement.Ellipsis disabled />}

			{page < 3 ? (
				<></>
			) : (
				<PaginationElement.Item
					onClick={() => paginationItemClick(newUrl(+page - 2))}
				>
					{+page - 2}
				</PaginationElement.Item>
			)}

			{page < 2 ? (
				<></>
			) : (
				<PaginationElement.Item
					onClick={() => paginationItemClick(newUrl(+page - 1))}
				>
					{+page - 1}
				</PaginationElement.Item>
			)}

			<PaginationElement.Item active>{page}</PaginationElement.Item>

			{page >= countPage - 1 ? (
				<></>
			) : (
				<PaginationElement.Item
					onClick={() => paginationItemClick(newUrl(+page + 1))}
				>
					{+page + 1}
				</PaginationElement.Item>
			)}
			{page >= countPage - 2 ? (
				<></>
			) : (
				<PaginationElement.Item
					onClick={() => paginationItemClick(newUrl(+page + 2))}
				>
					{+page + 2}
				</PaginationElement.Item>
			)}

			{countPage - 3 <= page ? <></> : <PaginationElement.Ellipsis disabled />}

			{page >= countPage ? (
				<></>
			) : (
				<PaginationElement.Item
					onClick={() => paginationItemClick(newUrl(countPage))}
				>
					{countPage}
				</PaginationElement.Item>
			)}
		</PaginationElement>
	)
}

export default Pagination
