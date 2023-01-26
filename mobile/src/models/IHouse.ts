import IHouseImage from './IHouseImage'
import ITimeStamps from './ITimeStamps'

export default interface IHouse extends ITimeStamps {
	houseId: number
	name: string
	category: string
	location: string
	price: number
	description: string
	images: IHouseImage[]
	isFavorite: boolean
}
