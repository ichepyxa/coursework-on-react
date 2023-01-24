export default interface IUser {
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
