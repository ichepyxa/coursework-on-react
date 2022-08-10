export interface IUser {
	id: number | undefined
	username: string | undefined
	email: string | undefined
	activationLink: string | undefined
	isActivated: boolean | undefined
	isPassedTest: boolean | undefined
	roleId: number | undefined
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
		roleId: number
	}
}

export interface IHouse {
	id: number
	title: string
	link: string
	category: string
	location: string
	price: number
	description: string
	images: []
}
