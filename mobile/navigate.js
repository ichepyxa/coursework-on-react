import Houses from './src/components/houses/Houses'
import Login from './src/components/login/Login'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function Navigate() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Houses}
					options={{ title: 'gfdjgkdg' }}
				/>
				<Stack.Screen
					name="Houses"
					component={Houses}
					options={{ title: 'Места отдыха' }}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ title: 'Авторизация' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
