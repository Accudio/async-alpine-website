const cheerio = require('cheerio')

module.exports = config => {
	config.addTransform('contentParser', (content, output) => {
		if (!output.endsWith('.html')) return content

		const $ = cheerio.load(content)

		/**
		 * add to each .heading the level of the heading
		 */
		for (const el of $('.header')) {
			const level = $('h2, h3, h4', el)[0].tagName
			$(el).addClass(level)
		}

    /**
     * Get all the code snippets and add alpine component to make keyboard-accessible
     */
		for (const snippet of $('pre[class^="language"]')) {
			$(snippet).wrap(`<div
				class="b-code"
				x-data="code"
				ax-load="idle"
				x-ignore
			></div>`)
		}

		return $.html()
	})
}
