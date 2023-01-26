import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HouseDescription from '../components/house-description/HouseDescription'
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
				<Stack.Screen
					name="House"
					component={HouseDescription}
					options={() => generateOptions('Подробности')}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
