import React from 'react'
import { ScrollView } from 'react-native'
import IHouse from '../../models/IHouse'
import House from '../house/House'

type TestResultProps = {
	houses: IHouse[]
}

export default function TestResult({ houses }: TestResultProps) {
	return (
		<ScrollView>
			{houses &&
				houses.map(house => (
					<House
						key={`house_${house.houseId * (Math.random() * 1000)}`}
						{...house}
					/>
				))}
		</ScrollView>
	)
}
