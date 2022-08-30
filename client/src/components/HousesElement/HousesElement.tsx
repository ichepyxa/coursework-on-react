import React, { FC } from 'react'
import { IHouse } from '../../models'
import House from '../House/House'

const HousesElement: FC<{ houses: IHouse[] }> = ({ houses }) => {
	return (
		<div className="houses d-md-flex align-items-center justify-content-around flex-wrap">
			{houses.map((house: IHouse) => (
				<House key={house.houseId} {...house} />
			))}
		</div>
	)
}

export default HousesElement
