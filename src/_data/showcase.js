const items = [
	{
		"title": "The Good Crisp Company",
		"url": "https://thegoodcrispcompany.com",
		"author": "Series Eight",
		"authorUrl": "https://serieseight.com",
		"image": "./src/assets/img/thegoodcrispcompany.png"
	},
	{
		"title": "Phil Wolstenholme",
		"url": "https://wolstenhol.me",
		"author": "Phil Wolstenholme",
		"authorUrl": "https://twitter.com/philw_",
		"image": "./src/assets/img/wolstenhol.me.png"
	},
	{
		"title": "Carl Robertshaw",
		"url": "https://carlrobertshaw.com",
		"author": "William Bocchinelli",
		"authorUrl": "https://twitter.com/williamhibberd",
		"image": "./src/assets/img/carlrobertshaw.png"
	}
]

module.exports = items
	.sort(() => Math.random() - 0.5)
	.slice(0, 3)
