import { Schema, type Types, model } from 'mongoose'

export interface IExercise {
	user_id: Types.ObjectId
	description: string
	duration: number
	date: Date
}

export const exerciseSchema = new Schema<IExercise>(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		description: { type: String, required: true },
		duration: { type: Number, required: true, min: [1, 'duration too short'] },
		date: { type: Date, required: true },
	},
	{ collection: 'exercises' },
)

export const Exercise = model<IExercise>('Exercise', exerciseSchema)
