const cheerio = require('cheerio')
const { PurgeCSS } = require('purgecss')
const { minify } = require('csso')

module.exports = () => {
	return {
		name: '@accudio/vite-plugin-inline-css',
		enforce: 'post',
		apply: 'build',
		transformIndexHtml: {
			enforce: 'post',
			transform: async (content, { bundle, path }) => {
				if (!path.endsWith('.html')) return content

				const $ = cheerio.load(content)

				const inlineStyles = $('link[rel="stylesheet"]')
				for (const style of inlineStyles) {
					const href = $(style).attr('href')
					const key = href.slice(1)

					const srcCss = bundle[key].source.toString()
					const {
						html: escapedHtml,
						css: escapedCSS
					} = escapePrepare(content, srcCss)

					const purgeCSSResults = await new PurgeCSS().purge({
						content: [{ raw: escapedHtml }],
						css: [{ raw: escapedCSS }],
						safelist: [
							'::-webkit-scrollbar',
							':where',
							'b-code__copy'
						]
					})
					const minifiedCss = minify(
						purgeCSSResults[0].css,
						{
							forceMediaMerge: true,
							comments: false
						}
					);

					$(style).replaceWith(`<style>${escapeUndo(minifiedCss.css)}</style>`)
				}

				return $.html()
			}
		}
	}
}

const escape = [ '[', ']', '(', ')', '.', '+', ',', '/', ':', '@' ]

function escapePrepare(html, css) {
	escape.forEach((char, i) => {
		html = html.replaceAll(char, `___inline-${i}___`)
		css = css.replaceAll(`\\${char}`, `___inline-${i}___`)
	})
	return { html, css }
}

function escapeUndo(css) {
	escape.forEach((char, i) => {
		css = css.replaceAll(`___inline-${i}___`, `\\${char}`)
	})
	return css
}
