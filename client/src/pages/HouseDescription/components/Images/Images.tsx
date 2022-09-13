import React, { FC, ReactNode } from 'react'
import { IHouseImage } from '../../../../models'

import './style.css'

const Images: FC<{
	name: string
	images: IHouseImage[]
	children: ReactNode
}> = ({ name, images, children }) => {
	return (
		<div className="house-description__images">
			<div className="house-description__item">
				{children}
				<img
					className="house-description__image"
					src={images[0].image}
					alt={name}
				/>
			</div>
			{images.length >= 3 ? (
				<>
					<div className="house-description__item">
						<img
							className="house-description__image"
							src={images[1].image}
							alt={name}
						/>
						<img
							className="house-description__image"
							src={images[2].image}
							alt={name}
						/>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default Images
