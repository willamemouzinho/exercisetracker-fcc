import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
		const DB_URL = String(process.env.DATABASE_URL)
		mongoose.set('strictQuery', false)
		await mongoose.connect(DB_URL, { dbName: 'exercise_tracker' })
		console.log('connection successful to DB')
	} catch (error) {
		console.error('database connection failed')
		process.exit(0)
	}
}
