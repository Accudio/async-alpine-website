const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')

const EleventyPluginSyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')
const InlineCSS = require('./utils/vite/vite-plugin-inline-css.js')

const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const shortcodes = require('./utils/shortcodes.js')

module.exports = function (eleventyConfig) {
	// Plugins
	eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight)
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		tempFolderName: '.11ty-vite', // Default name of the temp folder

		// Vite options (equal to vite.config.js inside project root)
		viteOptions: {
			publicDir: 'public',
			clearScreen: false,
			server: {
				mode: 'development',
				middlewareMode: true,
			},
			appType: 'custom',
			assetsInclude: ['**/*.xml', '**/*.txt'],
			plugins: [
				InlineCSS()
			],
			build: {
				mode: 'production',
				sourcemap: 'true',
				manifest: true,
				cssCodeSplit: false,
				// rollupOptions: {
				// 	output: {
				// 		assetFileNames: 'assets/main.[hash].css',
				// 		chunkFileNames: 'assets/[name].[hash].js',
				// 		entryFileNames: 'assets/[name].[hash].js'
				// 	}
				// }
			}
		}
	})

	// Filters, Transforms and Shortcodes
	filters(eleventyConfig)
	transforms(eleventyConfig)
	shortcodes(eleventyConfig)

	// Customize Markdown library and settings:
	let markdownLibrary = markdownIt({
		html: true,
		breaks: true,
		linkify: true,
		code: false
	})
	markdownLibrary.use(markdownItAttrs)
	markdownLibrary.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.linkAfterHeader({
			style: 'visually-hidden',
			assistiveText: title => `Permalink to “${title}”`,
			visuallyHiddenClass: 'sr-only',
			class: 'header__link',
			wrapper: ['<div class="header">', '</div>'],
			symbol: '#',
		}),
		level: [2, 3, 4],
		slugify: eleventyConfig.getFilter('slug')
	})
	eleventyConfig.setLibrary('md', markdownLibrary)

	// Layouts
	eleventyConfig.addLayoutAlias('base', 'base.njk')
	eleventyConfig.addLayoutAlias('post', 'post.njk')

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy('src/assets/css')
	eleventyConfig.addPassthroughCopy('src/assets/js')

	eleventyConfig.setServerPassthroughCopyBehavior("copy");
	eleventyConfig.addPassthroughCopy("public");

	return {
		templateFormats: ['md', 'njk', 'html', 'liquid'],
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			output: '_dist',
			includes: '_includes',
			layouts: 'layouts',
			data: '_data'
		}
	}
}
