export interface Mentor {
	id: MentorId
	avatar: string
	name: string
	major: string
	info: string
	isFollow: boolean
	taskQuantity: number
	rating: number
	reviews: number
}
type MentorId = number