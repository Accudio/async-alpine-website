---
title: Getting Started — Async Alpine Documentation
---

# Getting Started

There are several [methods of installing](/docs/install) Async Alpine depending on how you set up Alpine and how you manage your JavaScript.

To get started, let's set up a page with the CDN installation and inline components. This may not be the best for you, but is the easiest!

## Install Async Alpine

Add `script` elements for Async Alpine and Alpine.js. Async Alpine has to be loaded first:

```html
<script defer src="https://cdn.jsdelivr.net/npm/async-alpine@0.5.x/dist/async-alpine.script.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

[More on installation](/docs/install)

## Components

The easiest way to use Async Alpine is with ES Module components using `export default` in standalone files. If you write your JavaScript by hand, you'll want to write your Alpine.js components so they look like this:

```js
// /components/my-component.js
export default function myComponent(message) {
	return {
		message: message,

		init() {
			console.log('you said', message)
		}
	}
}
```

Make sure this file is in a publicly-accessible location within your website!

[More on components](/docs/usage)

## Wiring it up

Now we set up our component within our HTML and let Async Alpine know where to find the component file:

```html
<div
	ax-load
	ax-load-src="/components/my-component.js"
	x-data="myComponent('message')"
	x-ignore
>
	...
</div>
```

In the snippet above, `ax-load` indicates this is an Async component and the `ax-load-src` attribute points to the URL of our component file.

Make sure to add your `x-data` attribute as you would normally with Alpine.js, and you also need to add the `x-ignore` attribute to your components.

[More on setup](/docs/usage)

## Success!

Now our component will only be loaded when it's present on the page. We can pass different strategies into the `ax-load` attribute to control how it should load:

- `ax-load="visible"` &mdash; load the component when it's visible within the viewport;
- `ax-load="media (min-width: 768px)"` &mdash; only load the component when the screen is wider than 768px.
- `ax-load="event"` &mdash; wait for a JavaScript event to load!

[More on strategies](/docs/strategies)

## Next Steps

- [Install via `npm`](/docs/install#npm)
- [Load components using different methods](/docs/usage)
- [Integrate with your bundler/tooling](/examples#setup)
- [Learn about advanced loading strategies](/docs/strategies)
- [Check out our examples](/examples)
- [Give us feedback or contribute to the project!](/docs/contributing)
