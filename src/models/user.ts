import { Schema, model } from 'mongoose'

interface IUser {
	username: string
}

const userSchema = new Schema<IUser>(
	{
		username: { type: String, required: true },
	},
	{ collection: 'users' },
)

export const User = model<IUser>('User', userSchema)
