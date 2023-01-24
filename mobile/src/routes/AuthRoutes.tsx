import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Houses from '../components/houses/Houses'
import { generateOptions } from '../helpers/generateOptions'

const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Houses}
					options={() => generateOptions('Места отдыха')}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
