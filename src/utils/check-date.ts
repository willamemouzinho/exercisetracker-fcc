export const checkDate = (date: string) => {
	if (!date) {
		return new Date(Date.now())
	}

	const parts = date.split('-')
	const year = Number.parseInt(parts[0])
	const month = Number.parseInt(parts[1]) - 1
	const day = Number.parseInt(parts[2])
	const utcDate = new Date(Date.UTC(year, month, day))

	return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000)
}
