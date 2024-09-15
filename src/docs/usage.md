---
title: Usage — Async Alpine Documentation
description: Async Alpine supports many methods of loading Alpine.js components asynchronously, depending on how your website is set up and built
---

# Usage

Alpine components are turned into async components by adding the attribute `x-load` — with optional [loading strategy](#strategies):

```html
<div
  x-load="visible"
  x-data="myComponent"
>
  <div x-text="message"></div>
</div>
```

You will need to convert your existing `Alpine.data()` components to standalone ES Module JavaScript files that can be loaded on-demand. There's a couple of different methods to do this, and the best will depend on how you write your JavaScript, if you have a build tool and how assets on your website are distributed.

General rules on how to load components depending on your environment:

- [URL Components](#url) &mdash; the simplest implementation, declaring component URLs in JS;
- [Data Components](#data) &mdash; for build tools with dynamic `import`/code-splitting like Vite, WebPack, Rollup, Parcel;
- [Alias Loading](#alias) &mdash; if your components are in a very consistent filesystem structure;
- [Inline Components](#inline) &mdash; you need to declare components in HTML to get the asset URL, for example using versioned asset URLs or an assets CDN.

## URL Components {id=url}

This is the simplest implementation, where you place your components in a publicly-accessible location and pass the URL for each component to Async Alpine within your JavaScript.

You provide components in an ES Module format—as `export default`—in a place that is publicly accessible. If you hand-code your component JavaScript this may be easy, but if you use a build tool you may need to set up your build tool in a certain way. An example of a ES Module component:

```js
// publicly available at `/assets/path-to-component.js`
export default function myComponent() {
  return {
    message: '',
    init() {
      this.message = 'my component has initialised!'
    }
  }
}
```

You then make Async Alpine aware of your components with `.asyncUrl()`:

```js
import AsyncAlpine from 'async-alpine';
import Alpine from 'Alpine.js';
Alpine.plugin(AsyncAlpine);
Alpine.asyncUrl('myComponent', './components/my-component.js');
Alpine.start();
```

Now the URL you provide will be downloaded and added as a component when the conditions of `x-load` are met!

## Data Components {id=data}

Data components offer the most flexibility, particularly to users of build tools like Vite, WebPack and more. They allow you to declare a download function that runs when the requirements of the component are met. With this you can do whatever you like, as long as you return either a function or an ES Module with `default` export.

You declare a data component using the `Alpine.asyncData()` function, where the first parameter matches the component name (used in `x-data`) and the second is your download function. This is most commonly used with a build tool code-splitting:

```js
import AsyncAlpine from 'async-alpine';
import Alpine from 'Alpine.js';
Alpine.plugin(AsyncAlpine);
Alpine.asyncData(
	'myComponent',
	() => import('./components/my-component.js')
);
Alpine.start();
```

With this pattern and a build tool that supports it this will automatically build your component into a separate file with the appropriate processing.

Keep in mind how your build tool, platform, and distribution method modify paths. You may need to tweak your configuration or use an alternate method.

## Alias Loading {id=alias}

If all of your component modules are in a consistent structure the Alias loading method means you don't have to specify the URLs for each component. Instead you can specify the structure of your component files using a string with `[name]` and Async Alpine will construct the URL, or by providing a function to `.asyncAlias()`.

```js
// components are in the /components/ directory named componentName.js
Alpine.asyncAlias('/components/[name].js')

// components are in the separate directories as index.js
Alpine.asyncAlias('/components/[name]/index.js')

// provide an alias function which receives the `name` parameter, particularly handy for build tools
Alpine.asyncAlias((name) => import(`/components/${name}.module.js`));
```

***Note:*** For the string method, Async Alpine does not know whether your component files actually exist. It will simply make a blind HTTP request based on the provided URL format and hope it returns something it can execute. For this reason only one `.alias()` is supported.

## Inline Components {id=inline}

Inline components are ideal if you only have your asset URLs within HTML, perhaps using an asset CDN, a versioning system, or certain platforms. This allows you to specify the component URL directly on the element in HTML instead of in your JavaScript.

Add the `x-load-src` attribute to your component HTML, with the full URL to the component JS:

```html
<div
  x-load="visible"
  x-load-src="/assets/path-to-component.js"
  x-data="myComponent"
>
  <div x-text="message"></div>
</div>
```

This is particularly useful for platforms or websites that use asset versioning or an asset CDN where the component URL might not be known ahead of time in JS. For example this may be helpful for Shopify sites where the above component could look like this:

```html
<div
  x-load="visible"
  x-load-src="{% raw %}{{ 'my-component.js' | asset_url }}{% endraw %}"
  x-data="myComponent"
></div>
```
