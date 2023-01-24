import React from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from 'react-native'

import IHouse from '../../models/IHouse'

export const categoriesHousesWithoutPrice = ['Кафе', 'Ресторан']

export default function House({
	houseId,
	images,
	name,
	category,
	price,
}: // isFavorite = false,
IHouse) {
	const handleClick = () => {}

	return (
		<TouchableNativeFeedback onPress={handleClick}>
			<View style={styles.house}>
				{images?.length > 0 ? (
					<Image
						style={styles.image}
						source={{ uri: images[0].image }} //Math.floor(Math.random() * images.length)
					/>
				) : (
					<View></View>
				)}

				<View style={styles.info}>
					<Text style={styles.strong}>
						Название:{' '}
						<Text style={styles.standart}>
							{name.length > 30 ? `${name.substring(0, 30)}...` : name}
						</Text>
					</Text>
					<Text style={styles.strong}>
						Категория: <Text style={styles.standart}>{category}</Text>
					</Text>
					{categoriesHousesWithoutPrice.includes(category) ? (
						<View></View>
					) : (
						<View>
							{price > 0 ? (
								<Text style={styles.strong}>
									Цена: <Text style={styles.standart}>{price} BYN</Text>
								</Text>
							) : (
								<Text>Цену нужно уточнять</Text>
							)}
						</View>
					)}
				</View>
			</View>
		</TouchableNativeFeedback>
	)
}

const styles = StyleSheet.create({
	house: {
		overflow: 'hidden',
		width: '100%',
		minHeight: 250,
		textAlign: 'center',
		position: 'relative',
		borderRadius: 5,
		backgroundColor: '#e9e9e9',
		marginVertical: 10,
	},
	image: {
		width: '100%',
		height: 200,
	},
	info: {
		padding: 15,
	},
	standart: {
		fontWeight: '400',
	},
	strong: {
		fontWeight: '600',
	},
})
