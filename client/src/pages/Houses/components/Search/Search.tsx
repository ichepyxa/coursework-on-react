import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import './style.css'

const Search: FC = () => {
	const { search } = useLocation()

	const urlParams = new URLSearchParams(search)

	let region = urlParams.get('region') ?? 1
	const [name, setName] = useState<string>(urlParams.get('name') ?? '')

	return (
		<div className="search d-md-flex align-items-end justify-content-between gap-5 my-4">
			<div className="search-area d-flex flex-column w-100">
				<h5>Область</h5>
				<select
					defaultValue={region || 1}
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
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</div>
			<Button variant="primary" className="search-btn">
				Отфильтровать
			</Button>
		</div>
	)
}

export default Search
