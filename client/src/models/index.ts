export interface ITimeStamps {
	createdAt: string
	updatedAt: string
}

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

export interface IHouse extends ITimeStamps {
	houseId: number
	name: string
	category: string
	location: string
	price: number
	description: string
	images: IHouseImage[]
	isFavorite: boolean
}

export interface IHouseFavorites extends ITimeStamps {
	favoritesId: number
	userId: number
	houseId: number
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

export interface ISight extends ITimeStamps {
	sightId: number
	name: string
	category: string
	location: string
	description: string
	images: ISightImage[]
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

export interface ISightFavorites extends ITimeStamps {
	favoritesId: number
	userId: number
	sightId: number
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

export interface ITest extends ITimeStamps {
	testId: number
	testName: string
	questions: IQuestion[]
}

export interface IAnswer extends ITimeStamps {
	answerId: number
	answer: string
	questionId: number
}

export interface IQuestion extends ITimeStamps {
	questionId: number
	question: string
	answers: IAnswer[]
	testId: number
}

export interface IUserAnswer {
	answerId: number
	questionId: number
}
