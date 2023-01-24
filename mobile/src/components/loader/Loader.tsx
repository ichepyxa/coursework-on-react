import React from 'react'
import { Text, View } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader'

type LoaderProps = {
	isLoading: boolean
	styles: {}
}

export default function Loader({ isLoading, styles }: LoaderProps) {
	return (
		<AnimatedLoader
			visible={isLoading}
			overlayColor="rgba(255,255,255,1)"
			animationStyle={styles}
			source={require('../../../assets/loader.json')}
			speed={1}
		></AnimatedLoader>
	)
}
