import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import AnimatedLoader from 'react-native-animated-loader'
import { API_URL } from '../../constants/apiUrl'
import IHouse from '../../models/IHouse'
import IHousesResponse from '../../models/IHousesResponse'
import House from '../house/House'
import Loader from '../loader/Loader'

export default function Houses() {
	const [isLoading, setIsLoading] = useState(false)
	const [houses, setHouses] = useState<IHouse[]>([])

	const getHouses = async () => {
		try {
			setIsLoading(true)
			setTimeout(async () => {
				await fetch(`${API_URL}/houses?page=1`)
					.then(res => res.json())
					.then((res: IHousesResponse) => setHouses(res.houses))
				setIsLoading(false)
			}, 5000)
		} catch (error) {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouses()
	}, [])

	return (
		<ScrollView>
			{isLoading ? (
				<Loader isLoading={isLoading} styles={styles.lottie} />
			) : houses && houses.length > 0 ? (
				<View style={styles.houses}>
					{/* <Text style={styles.title}>Места отдыха</Text> */}
					{houses.map(house => (
						<House key={`house_${house.houseId}`} {...house} />
					))}
				</View>
			) : (
				<Text>Нет мест отдыха</Text>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	houses: {
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '500',
		marginVertical: 10,
	},
	lottie: {
		width: 250,
		height: 250,
	},
})
