import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native'

import ISight from '../../models/ISight'

export const categoriesHousesWithoutPrice = ['Кафе', 'Ресторан']

const Sight = React.memo(({ sightId, images, name, category }: ISight) => {
	const navigation = useNavigation()
	const firstCategory = category.split(',')[0]
	const newCategory = firstCategory[0].toUpperCase() + firstCategory.slice(1)

	const handleClick = () => {
		navigation.navigate<string>('Sight', {
			sightId,
		})
	}

	return (
		<TouchableNativeFeedback onPress={handleClick}>
			<View style={styles.sight}>
				{images && images?.length > 0 ? (
					<Image style={styles.image} source={{ uri: images[0].image }} />
				) : (
					<View style={styles.image}></View>
				)}

				<View style={styles.info}>
					<Text style={styles.strong}>
						Название:{' '}
						<Text style={styles.standart}>
							{name.length > 30 ? `${name.substring(0, 30)}...` : name}
						</Text>
					</Text>
					<Text style={styles.strong}>
						Категория: <Text style={styles.standart}>{newCategory}</Text>
					</Text>
				</View>
			</View>
		</TouchableNativeFeedback>
	)
})

const styles = StyleSheet.create({
	sight: {
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

export default Sight
