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
	createdAt: string
	updatedAt: string
	isFavorite: boolean
}

export interface IHouseFavorites {
	favoritesId: number
	userId: number
	houseId: number
	createdAt: string
	updatedAt: string
}

export interface IHouseResponse {
	count: number,
	houses: IHouse[]
}

export interface IHouseFavoritesResponse {
	length: any
	houses: IHouse[]
}

export interface IHouseImage {
	imageId: number,
	image: string
}
