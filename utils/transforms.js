const cheerio = require('cheerio')
const { minify } = require('html-minifier')

module.exports = config => {
	// production only
  if (process.env.ELEVENTY_ENV === 'prod') {
		config.addTransform('htmlmin', (content, output) => {
			if (!output.endsWith('.html')) return content
			const minified = minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true
			})
			return minified
		})
  }

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
			const parent = $(snippet).wrap(`<div
				class="b-code"
				x-data="code"
				ax-load="idle"
				x-ignore
			></div>`)
			$(parent).append('<div class="b-code__copy hidden"></div>')
		}

		return $.html()
	})
}
