import type { Request, Response } from 'express'
import { User } from '../models/user'

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find({})

		return res.status(200).json(users)
	} catch (error) {
		console.error(error)
		// return res.status(500).json(error)
		return res.status(500).json({ message: 'internal server error.' })
	}
}
