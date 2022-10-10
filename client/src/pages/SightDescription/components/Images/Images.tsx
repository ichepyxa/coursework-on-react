import React, { FC, ReactNode } from 'react'
import { ISightImage } from '../../../../models/index'

import './style.css'

const Images: FC<{
	name: string
	images: ISightImage[]
	children: ReactNode
}> = ({ name, images, children }) => {
	return (
		<div className="sight-description__images">
			<div className="sight-description__item">
				{children}
				<img
					className="sight-description__image"
					src={images[0].image}
					alt={name}
				/>
			</div>
			{images.length >= 3 ? (
				<>
					<div className="sight-description__item">
						<img
							className="sight-description__image"
							src={images[1].image}
							alt={name}
						/>
						<img
							className="sight-description__image"
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
