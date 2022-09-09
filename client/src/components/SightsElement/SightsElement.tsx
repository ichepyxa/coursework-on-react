import React, { FC } from 'react'
import { ISight } from '../../models'
import Sight from '../Sight/Sight'

const SightsElement: FC<{ sights: ISight[] }> = ({ sights }) => {
	return (
		<div className="sights d-md-flex align-items-center justify-content-center flex-wrap">
			{sights.map((sight: ISight) => (
				<Sight key={sight.sightId} {...sight} />
			))}
		</div>
	)
}

export default SightsElement
