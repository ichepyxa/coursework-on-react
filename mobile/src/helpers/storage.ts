import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (
	key: string,
	value: string | object
): Promise<boolean> => {
	try {
		let modifyValue =
			value !== null && typeof value === 'object'
				? JSON.stringify(value)
				: value

		await AsyncStorage.setItem(`@${key}`, modifyValue)
		return true
	} catch (error) {
		return false
	}
}

export const getStringData = async (key: string): Promise<string | boolean> => {
	try {
		const value = await AsyncStorage.getItem(`@${key}`)
		return value !== null ? value : false
	} catch (error) {
		return false
	}
}

export const getObjectData = async (key: string): Promise<object | boolean> => {
	try {
		const value = await AsyncStorage.getItem(`@${key}`)
		return value !== null ? JSON.parse(value) : false
	} catch (error) {
		return false
	}
}
