import React, { FC } from 'react'
import { IHouse } from '../../models/index'
import HouseAdmin from '../HouseAdmin/HouseAdmin'

const HousesElementAdmin: FC<{ houses: IHouse[] }> = ({ houses }) => {
	return (
		<div className="houses d-md-flex align-items-center justify-content-center flex-wrap">
			<ul className="mt-lg-3 w-100 p-0">
				<div className="list-group">
					{houses.map((house: IHouse) => (
						<HouseAdmin key={house.houseId} {...house} />
					))}
				</div>
			</ul>
		</div>
	)
}

export default HousesElementAdmin
