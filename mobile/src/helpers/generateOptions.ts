import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export const generateOptions = (title): NativeStackNavigationOptions => {
	return {
		title,
		headerStyle: {
			backgroundColor: '#1D90ED',
		},
		statusBarColor: '#1D90ED',
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff',
			fontSize: 22,
			fontFamily: 'mt-semibold',
		},
	}
}
