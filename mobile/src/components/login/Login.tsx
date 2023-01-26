import { useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableNativeFeedback,
	View,
} from 'react-native'

import { checkIsAuth } from '../../helpers/checkIsAuth'
import { getStringData, storeData } from '../../helpers/storage'
import AuthService from '../../services/authService'
import Loader from '../loader/Loader'

export default function Login({ navigation, route }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleButtonLogin = async () => {
		try {
			setIsLoading(true)
			await AuthService.login(email, password).then(async response => {
				await storeData('token', response.data.accessToken)
				setIsLoading(false)
			})
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<View>
			{isLoading ? (
				<Loader isLoading={isLoading} />
			) : (
				<View style={styles.container}>
					<Text style={styles.title}>Вход</Text>
					<Text style={styles.inputTitle}>E-mail</Text>
					<TextInput
						onChangeText={value => setEmail(value)}
						placeholder="Пример: example@exm.com"
						style={styles.input}
					/>
					<Text style={styles.inputTitle}>Пароль</Text>
					<TextInput
						onChangeText={value => setPassword(value)}
						placeholder="Пример: Mr36NfiYy3"
						style={styles.input}
					/>
					<TouchableNativeFeedback onPress={handleButtonLogin}>
						<Text style={styles.btn}>Войти</Text>
					</TouchableNativeFeedback>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		height: '100%',
		width: '100%',
		paddingHorizontal: 45,
		justifyContent: 'center',
	},
	btn: {
		textAlign: 'center',
		fontFamily: 'mt-medium',
		backgroundColor: '#1D90ED',
		color: '#fff',
		width: '100%',
		fontSize: 20,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 7,
		marginTop: 15,
	},
	title: {
		width: '100%',
		fontFamily: 'mt-medium',
		fontSize: 30,
		textAlign: 'center',
	},
	inputTitle: {
		textAlign: 'left',
		fontFamily: 'mt-regular',
		marginTop: 10,
		marginBottom: 5,
		fontSize: 16,
	},
	input: {
		fontFamily: 'mt-regular',
		borderWidth: 2,
		borderColor: '#3EB5E6',
		width: '100%',
		paddingHorizontal: 15,
		paddingVertical: 7,
		borderRadius: 7,
		marginBottom: 5,
	},
})
