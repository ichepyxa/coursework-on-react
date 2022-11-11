export interface IUser {
	userId: number | undefined
	username: string | undefined
	email: string | undefined
	activationLink: string | undefined
	isActivated: boolean | undefined
	isPassedTest: boolean | undefined
	avatar: string | undefined
	roleId: number | undefined
	isAdmin: boolean | undefined
}

export interface IUserResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}

export interface IUserAdmin extends IUser {
	role: string | undefined
}

export interface IUsersResponse {
	count: number
	users: IUser[]
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

export interface IHousesResponse {
	count: number
	houses: IHouse[]
}

export interface IHouseFavoritesResponse {
	length: any
	houses: IHouse[]
}

export interface IHouseImage {
	imageId: number
	image: string
}

export interface ISight {
	sightId: number
	name: string
	category: string
	location: string
	description: string
	images: ISightImage[]
	createdAt: string
	updatedAt: string
	isFavorite: boolean
}

export interface ISightsResponse {
	count: number
	sights: ISight[]
}

export interface ISightImage {
	imageId: number
	image: string
}

export interface ISightFavorites {
	favoritesId: number
	userId: number
	sightId: number
	createdAt: string
	updatedAt: string
}

export interface ISightFavoritesResponse {
	length: any
	sights: ISight[]
}

export interface IAvatar {
	avatar: string
}

export interface IChangeUsernameResponse {
	username: string
}

export interface IAnswer {
	answerId: number
	answer: string
}

export interface IQuestion {
	questionId: number
	title: string
	answers: IAnswer[]
}

export interface IUserAnswer {
	answerId: number
	questionId: number
}
