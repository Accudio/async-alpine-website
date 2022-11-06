const Image = require("@11ty/eleventy-img");
const navDocs = require('../src/_data/navDocs.json')

module.exports = config => {
	config.addShortcode('year', () => `${new Date().getFullYear()}`)

	config.addShortcode('docsFooter', current => {
		const currentIndex = navDocs.findIndex(item => item.url === current)
		const prev = currentIndex > 0 ? navDocs[currentIndex - 1] : false
		const next = currentIndex < navDocs.length - 1 ? navDocs[currentIndex + 1] : false
		return `
			<div class="flex flex-wrap justify-between gap-[1rem] mt-auto pt-[3rem]">
				${prev ? `<a href="${prev.url}">&larr; ${prev.title}</a>` : '<span></span>'}
				${next ? `<a href="${next.url}">${next.title} &rarr;</a>` : '<span></span>'}
			</div>
		`
	})

  config.addNunjucksAsyncShortcode('image', imageShortcode);
  config.addLiquidShortcode('image', imageShortcode);
  config.addJavaScriptFunction('image', imageShortcode);
}

async function imageShortcode(src, alt, className = '', sizes = '400px') {
  let metadata = await Image(src, {
		outputDir: './_dist/img/',
    widths: [300, 450, 600, 800],
    formats: ["avif", "jpeg"]
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
		class: className
  };

	return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}
