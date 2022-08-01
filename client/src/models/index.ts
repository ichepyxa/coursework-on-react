export interface IUserResponse {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		username: string
		email: string
		password: string
		activationLink: string
		isActivated: boolean
		isPassedTest: boolean
	}
}

export interface IUserLogin {
	email: string
	password: string
}
