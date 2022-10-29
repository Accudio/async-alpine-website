const cheerio = require('cheerio')

module.exports = {
	headingWrappers(content, output) {
		if (!output.endsWith('.html')) return content

		const $ = cheerio.load(content)
		for (let el of $('.header')) {
			const level = $('h2, h3, h4', el)[0].tagName
			$(el).addClass(level)
		}

		return $.html()
	}
}
