import type { Request, Response } from 'express'
import type { Types } from 'mongoose'
import { Exercise } from '../models/exercise'
import { User } from '../models/user'

interface GetLogsQuerySchema {
	to?: string
	from?: string
	limit?: string
}

interface GetLogsParamsSchema {
	userId: Types.ObjectId
}

interface Log {
	description: string
	duration: number
	date: string
}

export const getLogs = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params as unknown as GetLogsParamsSchema
		const { to, from, limit } = req.query as unknown as GetLogsQuerySchema
		const user = await User.findById(userId)
		if (!user) {
			return res.status(400).json({
				message: 'user not found.',
			})
		}

		const query = {
			user_id: userId,
			...((from || to) && {
				date: {
					...(from && { $gte: from }),
					...(to && { $lte: to }),
				},
			}),
		}
		const exercises = await Exercise.find(query)
			.limit(Number(limit) || 0)
			.select({ description: 1, duration: 1, date: 1, _id: 0 })
			.exec()

		const log: Log[] = exercises.map(({ description, date, duration }) => ({
			description,
			duration,
			date: date.toDateString(),
		}))

		return res.status(200).json({
			_id: user.id,
			username: user.username,
			count: log.length,
			log,
		})
	} catch (error) {
		console.error(error)
		// return res.status(500).json(error)
		return res.status(500).json({ message: 'internal server error.' })
	}
}
