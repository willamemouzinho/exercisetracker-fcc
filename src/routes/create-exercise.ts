import type { Request, Response } from 'express'
import type { Types } from 'mongoose'
import { Exercise } from '../models/exercise'
import { User } from '../models/user'
import { checkDate } from '../utils/check-date'

interface CreateExerciseBodySchema {
	':_id': Types.ObjectId
	description: string
	duration: number
	date: string
}

interface CreateExerciseParamsSchema {
	userId: Types.ObjectId
}

export const createExercise = async (req: Request, res: Response) => {
	try {
		const {
			description,
			duration,
			date,
			':_id': user_id,
		} = req.body as CreateExerciseBodySchema
		const { userId } = req.params as unknown as CreateExerciseParamsSchema
		const user = await User.findById(userId || user_id)
		if (!user) {
			return res.status(400).json({
				message: 'user not found.',
			})
		}

		const exercise = await Exercise.create({
			user_id: userId || user_id,
			description,
			duration,
			date: checkDate(date),
		})
		await exercise.save()

		return res.status(200).json({
			_id: user.id,
			username: user.username,
			date: exercise.date.toDateString(),
			duration: exercise.duration,
			description: exercise.description,
		})
	} catch (error) {
		console.error(error)
		// return res.status(500).json(error)
		return res.status(500).json({ message: 'internal server error.' })
	}
}
