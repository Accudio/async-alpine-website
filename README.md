# Async Alpine Website

This repo is for the documentation website for [Async Alpine](https://async-alpine.dev). See the website or the [project GitHub repo](https://github.com/Accudio/async-alpine) for more info about the library.

This site is built using Eleventy, Vite, Tailwind and Alpine, and is deployed to Netlify.

## Development

Install packages with `npm i`, and run the development server with `npm run dev`. The website source is in `src/`.

`npm run fonts` will use glyphhanger to subset and optimise the fonts, and `npm run bench` will run Eleventy's benchmark tool.

## Custom stuff

### Inline CSS Vite plugin

I've written a custom Vite plugin in `utils/vite/vite-plugin-inline-css.js` that runs on a production build and replaces references to local css files with embedded `style` elements.

This is to improve loading performance, instead of using a render-blocking CSS file. It also runs PurgeCSS and CSSO on the HTML+CSS combo to reduce this as much as possible.

Unfortunately PurgeCSS/CSSO don't get along with some of the unusual characters used by Tailwind and Sailwind so there is a hacky 'escaping' system of string replacements. It seems to work pretty well but it's a little dodge so 🤷.

### Sailwind

The site uses my prototype Sailwind project which adds fluid spacing and type utilities to Tailwind. It's pretty rough and not maintained but works okay so hasn't been replaced quite yet.

## Showcase

Showcase items are specified in `src/_data/showcase.js`. These are then randomly shuffled and output into the homepage and showcase pages.

A Netlify function runs once a day to request a build webhook specified in `process.env.BUILD_WEBHOOK`. This re-runs a new build and refreshes the shuffling of the showcase items.

New showcase images should be 1985x1336 to match the ratio and size of the other items.

## Deployment

`npm run build` runs a production build, output to `dist/`.

Deployments are made by committing and pushing to `main`. Netlify will make a production deployment within a few minutes.

## License and Credits

This project is licensed under the Apache-2.0 license.

The full license is included at [LICENSE.md](https://github.com/Accudio/async-alpine-website/blob/main/LICENSE.md), or at [apache.org/licenses/LICENSE-2.0](https://apache.org/licenses/LICENSE-2.0).

Copyright © [Alistair Shepherd](https://alistairshepherd.uk).