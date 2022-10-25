import React, { FC } from 'react'
import { ISight } from '../../models/index'
import SightAdmin from '../SightAdmin/SightAdmin'

type SightsElementAdminProps = {
	sights: ISight[]
}

const SightsElementAdmin: FC<SightsElementAdminProps> = ({ sights }) => {
	return (
		<>
			<div className="houses d-md-flex align-items-center justify-content-center flex-wrap">
				<ul className="mt-lg-3 w-100 p-0">
					<div className="list-group">
						{sights.map((sight: ISight) => (
							<SightAdmin key={sight.sightId} {...sight} />
						))}
					</div>
				</ul>
			</div>
		</>
	)
}

export default SightsElementAdmin
