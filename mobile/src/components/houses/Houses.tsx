import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import IHouse from '../../models/IHouse'
import HousesService from '../../services/housesService'
import House from '../house/House'
import Loader from '../loader/Loader'

const keyExtractor = house =>
	`house_${house.houseId.toString() * (Math.random() * 1500)}`

const renderItem = ({ item }: { item: IHouse }) => <House {...item} />

export default function Houses() {
	const [isInitLoading, setIsInitLoading] = useState(true)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [houses, setHouses] = useState<IHouse[]>([])
	const [page, setPage] = useState<number>(1)

	const onRefresh = async () => {
		setPage(1)
		setIsRefreshing(true)
		setHouses([])
		await getHouses()
		setIsRefreshing(false)
	}

	const getHouses = async () => {
		try {
			isInitLoading ? setIsLoading(true) : null
			await HousesService.getHouses(page).then(response => {
				setHouses(state => [...state, ...response.data.houses])
				setPage(state => state + 1)
				setIsInitLoading(false)
				// Imittation delay
				setTimeout(() => (isInitLoading ? setIsLoading(false) : null), 1000)
			})
		} catch (error) {
			isInitLoading ? setIsLoading(false) : null
		}
	}

	useEffect(() => {
		getHouses()
	}, [])

	return isLoading ? (
		<Loader isLoading={isLoading} />
	) : (
		<View>
			<Text style={styles.title}>Места отдыха</Text>
			<FlatList
				style={styles.houses}
				data={houses}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				onEndReachedThreshold={0.25}
				onEndReached={getHouses}
				refreshing={isRefreshing}
				onRefresh={onRefresh}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	error: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	houses: {
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	title: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: '500',
		marginBottom: 10,
		marginTop: 20,
	},
})
