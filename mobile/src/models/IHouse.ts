import IHouseImage from './IHouseImage'

export default interface IHouse {
	houseId: number
	name: string
	category: string
	location: string
	price: number
	description: string
	images: IHouseImage[]
	isFavorite: boolean
}
