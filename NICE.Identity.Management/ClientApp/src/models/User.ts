
export type UserStatus = 'pending' | 'active' | 'incomplete'

export class User{
	id: string = ''
	firstName: string = ''
	lastName: string = ''
	email: string = ''
	status?: UserStatus = 'incomplete'
	locked?: boolean = false
}

export interface UserResponse {
	data: Array<User>
	count: number
}

export interface DeleteUserObj extends Partial<User>{
	id: string
}