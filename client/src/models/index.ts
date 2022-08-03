export interface IUser {
	id: number | undefined
	username: string | undefined
	email: string | undefined
	activationLink: string | undefined
	isActivated: boolean | undefined
	isPassedTest: boolean | undefined
}

export interface IUserResponse {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		username: string
		email: string
		activationLink: string
		isActivated: boolean
		isPassedTest: boolean
	}
}

// export interface IUserLoginRequest {
// 	email: string
// 	password: string
// }

// export interface IUserRegistrationRequest {
// 	username: string
// 	email: string
// 	password: string
// }
