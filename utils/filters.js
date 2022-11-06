const { DateTime } = require('luxon')

module.exports = config => {
	config.addFilter('dateToFormat', (date, format) => {
		return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format))
	})

	config.addFilter('dateToISO', (date) => {
		return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
			includeOffset: false,
			suppressMilliseconds: true
		})
	})
}
