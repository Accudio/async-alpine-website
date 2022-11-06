const Image = require("@11ty/eleventy-img");

module.exports = config => {
	config.addShortcode('year', () => `${new Date().getFullYear()}`)

  config.addNunjucksAsyncShortcode('image', imageShortcode);
  config.addLiquidShortcode('image', imageShortcode);
  config.addJavaScriptFunction('image', imageShortcode);
}

async function imageShortcode(src, alt, className = '', sizes = '400px') {
  let metadata = await Image(src, {
		outputDir: './_dist/img/',
    widths: [300, 600],
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
