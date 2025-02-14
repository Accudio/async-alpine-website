---
title: Installation — Async Alpine Documentation
description: Installation details for Async Alpine using a CDN or npm installation, depending on how you load Alpine.js
---

# Installation

There are two recommended methods of loading Async Alpine. Adding a `script` tag with a [CDN](#cdn) or importing it into your bundle with [npm](#npm).

Which method you use will depend on how you prefer to use and import Alpine.js.

## Content Delivery Network {#cdn}

If you load Alpine from a CDN like [jsdelivr](https://www.jsdelivr.com/package/npm/async-alpine) with a script tag you can load Async Alpine via the same method:

```html
<script defer src="https://cdn.jsdelivr.net/npm/async-alpine@2.x.x/dist/async-alpine.script.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

When loading via this method you need to make sure that Async Alpine loads first. This is generally done by including the `script` tag for Async Alpine *before* Alpine. Watch out if you use `type="module"` or `async` on your script tags.

## npm

Install from [npm](https://www.npmjs.com/package/async-alpine) with:

```sh
npm install async-alpine
```

Import it into your bundle alongside Alpine and run `Alpine.plugin(AsyncAlpine)` before `Alpine.start()`:

```js
import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs';
Alpine.plugin(AsyncAlpine);
Alpine.start();
```
