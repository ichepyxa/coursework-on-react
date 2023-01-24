import * as Font from 'expo-font'

export default async function fonts(callback) {
	await Font.loadAsync({
		'mt-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
		'mt-light': require('../../assets/fonts/Montserrat-Light.ttf'),
		'mt-medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
		'mt-regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
		'mt-semibold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
	})
	callback()
}
