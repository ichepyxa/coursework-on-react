import React, { FC } from 'react'

interface Item {
	svg: any
	title: string
	description: string
}

const BenefitsItem: FC<Item> = ({ svg, title, description }) => {
	return (
		<div className='benefits-item'>
			<div className='benefits-item__img'>{svg}</div>
			<h2 className='benefits-item__title mt-3 mb-2'>{title}</h2>
			<p className='benefits-item__description m-auto'>{description}</p>
		</div>
	)
}

export default BenefitsItem
