import ISightImage from './ISightImage'
import ITimeStamps from './ITimeStamps'

export default interface ISight extends ITimeStamps {
	sightId: number
	name: string
	category: string
	location: string
	description: string
	images: ISightImage[]
	isFavorite: boolean
}
