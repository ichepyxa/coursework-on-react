import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../components/login/Login'
import { generateOptions } from '../helpers/generateOptions'

const Stack = createNativeStackNavigator()

export default function GuestRoutes() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Login}
					options={() => generateOptions('Вход')}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
