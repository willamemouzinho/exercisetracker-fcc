import type { Request, Response } from 'express'
import { User } from '../models/user'

interface BodySchema {
	username: string
}

export const createUser = async (req: Request, res: Response) => {
	try {
		const { username } = req.body as BodySchema
		const user = await User.create({
			username,
		})
		await user.save()

		return res.status(200).json({
			username: user.username,
			_id: user.id,
		})
	} catch (error) {
		console.error(error)
		// return res.status(500).json(error)
		return res.status(500).json({ message: 'internal server error.' })
	}
}
