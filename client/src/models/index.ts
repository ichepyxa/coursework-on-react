export interface IUser {
	userId: number | undefined
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
	user: IUser
}

export interface IHouse {
	houseId: number
	name: string
	category: string
	location: string
	price: number
	description: string
	images: IHouseImage[]
}

export interface IHouseResponse {
	count: number,
	houses: IHouse[]
}

export interface IHouseImage {
	imageId: number,
	image: string
}
