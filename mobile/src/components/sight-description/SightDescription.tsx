import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import ISight from '../../models/ISight'
import SightsService from '../../services/sightsService'
import Loader from '../loader/Loader'

export default function SightDescription({ route }) {
	const { sightId } = route.params
	const [sight, setSight] = useState<ISight>({} as ISight)
	const [isLoading, setIsLoading] = useState(false)

	const getSight = async () => {
		try {
			setIsLoading(true)
			await SightsService.getSight(sightId).then(response => {
				setSight(response.data)
				// Imittation delay
				setTimeout(() => setIsLoading(false), 1000)
			})
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getSight()
	}, [])

	return isLoading ? (
		<Loader isLoading={isLoading} />
	) : sight === null || Object.keys(sight).length === 0 ? (
		<View style={styles.error}>
			<Text style={styles.title}>Такая достопримечательность не найдена.</Text>
		</View>
	) : (
		<ScrollView>
			<View style={styles.sight}>
				<Text style={styles.title}>{sight.name}</Text>

				{sight?.images?.length > 0 ? (
					<Image style={styles.img} source={{ uri: sight?.images[0]?.image }} />
				) : (
					<Image
						style={styles.img}
						source={require('../../../assets/no-house-img.svg')}
					/>
				)}

				<Text style={styles.text}>
					<Text style={styles.strong}>Категория:</Text>{' '}
					{sight.category
						.split(',')
						.map(item => {
							const trimItem = item.trim()
							if (trimItem.length < 2) {
								return trimItem
							}

							return trimItem[0].toString().toUpperCase() + trimItem.slice(1)
						})
						.join(', ')}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.strong}>Местонахождение: </Text>
					{sight.location.trim()}
				</Text>
				{sight?.description?.length > 0 ? (
					<Text style={styles.text}>
						<Text style={styles.strong}>Описание:</Text>{' '}
						{sight.description.trim()}
					</Text>
				) : (
					<Text style={styles.text}>
						<Text style={styles.strong}>Описание:</Text> Описание отсутвует
					</Text>
				)}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	error: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		width: '100%',
		height: 200,
		borderRadius: 7,
		borderColor: '#aaa',
		borderWidth: 1,
		marginVertical: 10,
	},
	sight: {
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	text: {
		fontSize: 16,
		textAlign: 'justify',
		marginVertical: 2,
	},
	title: {
		fontSize: 22,
		fontFamily: 'mt-semibold',
		textAlign: 'center',
	},
	strong: {
		fontSize: 18,
		fontFamily: 'mt-semibold',
	},
	btn: {
		width: '100%',
		textAlign: 'center',
		fontFamily: 'mt-medium',
		backgroundColor: '#1D90ED',
		color: '#fff',
		fontSize: 18,
		paddingVertical: 5,
		borderRadius: 7,
		marginVertical: 5,
	},
	disableBtn: {
		width: '100%',
		textAlign: 'center',
		fontFamily: 'mt-medium',
		backgroundColor: '#1D90ED',
		opacity: 0.7,
		color: '#fff',
		fontSize: 18,
		paddingVertical: 5,
		borderRadius: 7,
		marginVertical: 5,
	},
})
