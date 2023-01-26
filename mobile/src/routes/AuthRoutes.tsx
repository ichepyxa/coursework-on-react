import {
	Foundation,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HouseDescription from '../components/house-description/HouseDescription'
import Houses from '../components/houses/Houses'
import SightDescription from '../components/sight-description/SightDescription'
import Sights from '../components/sights/Sights'
import Test from '../components/test/Test'
import { generateOptions } from '../helpers/generateOptions'

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export default function AuthRoutes() {
	const TabStack = () => {
		return (
			<Tab.Navigator
				activeColor="#fff"
				inactiveColor="#eee"
				barStyle={{
					paddingBottom: 10,
					backgroundColor: '#1D90ED',
				}}
			>
				<Tab.Screen
					name="Места отдыха"
					component={Houses}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialIcons name="house" size={24} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="Достопримечательности"
					component={Sights}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="hoop-house"
								size={24}
								color={color}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Тест"
					component={Test}
					options={{
						tabBarIcon: ({ color }) => (
							<Foundation name="clipboard-notes" size={24} color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		)
	}

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Tab"
				component={TabStack}
				options={{ headerShown: false, statusBarColor: '#1D90ED' }}
			/>
			<Stack.Screen
				name="House"
				component={HouseDescription}
				options={() => generateOptions('Подробности')}
			/>
			<Stack.Screen
				name="Sight"
				component={SightDescription}
				options={() => generateOptions('Подробности')}
			/>
		</Stack.Navigator>
	)
}
