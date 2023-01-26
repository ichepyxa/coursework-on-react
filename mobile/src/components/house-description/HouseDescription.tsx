import React, { useEffect, useState } from 'react'
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native'
import { categoriesHousesWithOtherText } from '../../constants/categoriesHousesWithOtherText'
import IHouse from '../../models/IHouse'
import HousesService from '../../services/housesService'
import { categoriesHousesWithoutPrice } from '../house/House'
import Loader from '../loader/Loader'

export default function HouseDescription({ route }) {
	const { houseId } = route.params
	const [house, setHouse] = useState<IHouse>({} as IHouse)
	const [isBooking, setIsBooking] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	// const addBookingHouse = async () => {
	// 	try {
	// 		setIsLoading(true)
	// 		await HousesService.addBookingHouse()
	// 	} catch (error) {
	// 		setIsLoading(false)
	// 	}
	// }

	const getHouse = async () => {
		try {
			setIsLoading(true)
			await HousesService.getHouse(houseId).then(response => {
				setHouse(response.data)
				// Imittation delay
				setTimeout(() => setIsLoading(false), 1000)
			})
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getHouse()
		// addBookingHouse()
	}, [])

	return isLoading ? (
		<Loader isLoading={isLoading} />
	) : house === null || Object.keys(house).length === 0 ? (
		<View style={styles.error}>
			<Text style={styles.title}>Такое место отдыха не найдено.</Text>
		</View>
	) : (
		<ScrollView>
			<View style={styles.house}>
				<Text style={styles.title}>{house.name}</Text>

				{house?.images?.length > 0 ? (
					<Image style={styles.img} source={{ uri: house?.images[0]?.image }} />
				) : (
					<Image
						style={styles.img}
						source={require('../../../assets/no-house-img.svg')}
					/>
				)}

				{categoriesHousesWithoutPrice.includes(house.category) ? (
					<></>
				) : (
					<View>
						{/* {isBooking ? (
							<TouchableNativeFeedback onPress={addBookingHouse}>
								<Text style={styles.btn}>Забронировать</Text>
							</TouchableNativeFeedback>
						) : (
							<Text style={styles.disableBtn}>Забронированно</Text>
						)} */}
						<Text style={styles.text}>
							<Text style={styles.strong}>Цена:</Text>
							{house.price > 0
								? ` от ${house.price} BYN за ${
										Object.keys(categoriesHousesWithOtherText).includes(
											house.category
										)
											? `${
													categoriesHousesWithOtherText[house.category]
											  } на сутки`
											: 'сутки'
								  }`
								: ' нужно уточнять'}
						</Text>
					</View>
				)}
				<Text style={styles.text}>
					<Text style={styles.strong}>Категория:</Text> {house.category}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.strong}>Местонахождение: </Text>
					{house.location.trim()}
				</Text>
				{house?.description?.length > 0 ? (
					<Text style={styles.text}>
						<Text style={styles.strong}>Описание:</Text>{' '}
						{house.description.trim()}
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
	house: {
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
