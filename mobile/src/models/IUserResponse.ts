import IUser from './IUser'

export default interface IUserResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}
