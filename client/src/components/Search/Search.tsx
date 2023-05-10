import React, { FC, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import createHref from '../../helpers/createHref'
import { useSearchParams } from '../../hooks/useSearchParams'

import './style.css'

const Search: FC<{ pageHrefPath: string }> = ({ pageHrefPath }) => {
	const navigate = useNavigate()
	const { name, page, region } = useSearchParams()

	const [inputName, setInputName] = useState<string>(name)
	const [selectRegion, setSelectRegion] = useState<string | number>(region)
	const [selectType, setSelectType] = useState<string | number>(1)

	const filterBtnClick = (name: string, region: string | number) =>
		navigate(createHref(pageHrefPath, 1, name, region))

	useEffect(() => {
		setInputName(name)
		setSelectRegion(region)
	}, [name, page, region])

	return (
		<div className="search d-md-flex align-items-end justify-content-between gap-5 my-4">
			<div className="search-area d-flex flex-column w-100">
				<h5>Область</h5>
				<select
					value={selectRegion}
					onChange={e => setSelectRegion(e.target.value)}
					className="search-area__select form-select"
				>
					<option value="1">Любая</option>
					<option value="2">Минская область</option>
					<option value="3">Брестская область</option>
					<option value="4">Витебская область</option>
					<option value="5">Гомельская область</option>
					<option value="6">Гродненская область</option>
					<option value="7">Могилевская область</option>
				</select>
			</div>
			<div className="search-title d-flex flex-column w-100">
				<h5>Название</h5>
				<input
					type="text"
					className="search-title__input form-control"
					placeholder="Название"
					value={inputName}
					onChange={e => setInputName(e.target.value)}
				/>
			</div>
			<Button
				variant="primary"
				className="search-btn"
				onClick={() => filterBtnClick(inputName, selectRegion)}
			>
				Отфильтровать
			</Button>
		</div>
	)
}

export default Search
