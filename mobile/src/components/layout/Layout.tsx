import React from 'react'
import { StyleSheet, View } from 'react-native'

type LayoutProps = {
	children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 35,
		paddingBottom: 35,
	},
})
