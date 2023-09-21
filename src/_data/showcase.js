// set viewport of chrome to 2000x1336, screenshot and crop out scrollbar

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
		"author": "William Hibberd",
		"authorUrl": "https://twitter.com/williamhibberd",
		"image": "./src/assets/img/carlrobertshaw.png"
	},
	{
		"title": "Ganni Responsibility Report 2022",
		"url": "https://responsibilityreport2022.ganni.com/",
		"author": "William Hibberd",
		"authorUrl": "https://twitter.com/williamhibberd",
		"image": "./src/assets/img/ganni-responsibility-report.png"
	},
	{
		"title": "New Orleans Original Daiquiris",
		"url": "https://nolaoriginal.com/",
		"author": "Series Eight",
		"authorUrl": "https://serieseight.com",
		"image": "./src/assets/img/nolaoriginal.png"
	},
	{
		"title": "Fat Tuesday",
		"url": "https://fattuesday.com/",
		"author": "Series Eight",
		"authorUrl": "https://serieseight.com",
		"image": "./src/assets/img/fattuesday.png"
	},
	{
		"title": "The House Group",
		"url": "https://thehouse-group.com/",
		"author": "William Hibberd",
		"authorUrl": "https://twitter.com/williamhibberd",
		"image": "./src/assets/img/the-house-group.png"
	}
]

module.exports = items
	.sort(() => Math.random() - 0.5)
