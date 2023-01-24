import React from 'react'
import { StyleSheet } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader'

type LoaderProps = {
	isLoading: boolean
}

export default function Loader({ isLoading }: LoaderProps) {
	return (
		<AnimatedLoader
			visible={isLoading}
			overlayColor="rgba(255,255,255,1)"
			animationStyle={styles.lottie}
			source={require('../../../assets/loader.json')}
			speed={1}
		></AnimatedLoader>
	)
}

const styles = StyleSheet.create({
	lottie: {
		width: 250,
		height: 250,
	},
})
