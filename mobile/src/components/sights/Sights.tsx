import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import ISight from '../../models/ISight'
import Sight from '../sight/Sight'
import Loader from '../loader/Loader'
import SightsService from '../../services/sightsService'

const keyExtractor = sight =>
	`sight_${sight.sightId.toString() * (Math.random() * 1500)}`

export default function Sights() {
	const [isInitLoading, setIsInitLoading] = useState(true)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [sights, setSights] = useState<ISight[]>([])
	const [page, setPage] = useState<number>(1)

	const renderItem = ({ item }) => <Sight {...item} />

	const onRefresh = async () => {
		setPage(1)
		setIsRefreshing(true)
		setSights([])
		await getSights()
		setIsRefreshing(false)
	}

	const getSights = async () => {
		try {
			isInitLoading ? setIsLoading(true) : null
			await SightsService.getSights(page).then(response => {
				setSights(state => [...state, ...response.data.sights])
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
		getSights()
	}, [])

	return isLoading ? (
		<Loader isLoading={isLoading} />
	) : (
		<FlatList
			style={styles.sights}
			data={sights}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			onEndReachedThreshold={0.25}
			onEndReached={getSights}
			refreshing={isRefreshing}
			onRefresh={onRefresh}
		/>
	)
}

const styles = StyleSheet.create({
	error: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sights: {
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '500',
		marginVertical: 10,
	},
})
