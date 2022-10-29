# Usage

Alpine components are turned into async components by adding the attributes `x-ignore` and `ax-load`—with optional [loading strategy](#strategies):

```html
<div
  x-ignore
  ax-load="visible"
  x-data="myComponent"
>
  <div x-text="message"></div>
</div>
```

First however you need to convert your existing `Alpine.data()` components to standalone ES Module JavaScript files that can be loaded on-demand. There's a couple of different methods to do this, and the best will depend on how you write your JavaScript, if you have a build tool and how assets on your website are distributed.

General rules on how to load components depending on your environment:

- [URL Components](#url) &mdash; simplest implementation declaring component URLs in JS;
- [Data Components](#data) &mdash; for build tools with dynamic `import`/code-splitting like Vite, WebPack, Rollup, Parcel;
- [Alias Loading](#alias) &mdash; if your components are in a very consistent file-system structure;
- [Inline Components](#inline) &mdash; you need to declare components in HTML to get the asset URL, for example using an asset CDN or for Shopify sites.

## URL Components {id=url}

The simplest implementation, where you place your components in a publicly-accessible location and pass the URL for each component to Async Alpine within your JavaScript.

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

You then make Async Alpine aware of your components with `.url()`:

```js
import AsyncAlpine from 'async-alpine';
import Alpine from 'Alpine.js';
AsyncAlpine
  .init(Alpine)
  .url('myComponent', './components/my-component.js')
  .start();
Alpine.start();
```

Now the URL you provide will be downloaded and added as a component when the conditions of `ax-load` are met!

## Data Components {id=data}

Data components offer the most flexibility, particularly to users of build tools like Vite, WebPack and more. They allow you to declare a download function that runs when the requirements of the component are met. With this you can do whatever you like, as long as you return either a function or an ES Module with `default` export.

You declare a data component using the `AsyncAlpine.data()` function, where the first parameter matches the component name (used in `x-data`) and the second is your download function. This is likely most commonly used to use your build tools code-splitting:

```js
import AsyncAlpine from 'async-alpine';
import Alpine from 'Alpine.js';
AsyncAlpine
  .init(Alpine)
  .data(
		'myComponent',
		() => import('./components/my-component.js')
	)
  .start();
Alpine.start();
```

With this pattern and a build tool that supports it this will automatically build your component into a separate file with the appropriate processing. Keep in mind however if your distribution method changes the file locations this may not work and you may need to use an alternate method.

## Alias Loading {id=alias}

If all of your component modules are in a consistent structure the Alias loading method means you don't have to specify the URLs for each component. Instead you can specify the structure of your component files and Async Alpine will construct the URL from the component name.

***Note:*** Async Alpine does not know whether your component files actually exist, it will simply make a blind HTTP request based on the provided URL format and hope it returns something it can execute. For this reason only one `.alias()` is supported.

```js
// components are in the /components/ directory named component.js
AsyncAlpine.alias('/components/[name].js')

// OR

// components are in the separate directories as index.js
AsyncAlpine.alias('/components/[name]/index.js')
```

## Inline Components {id=inline}

Inline components are ideal if you have an unusual way of distributing JavaScript files (like using an asset CDN). This allows you to specify the component URL directly on the element in HTML instead of in your JavaScript.

Add the `ax-load-src` attribute to your component HTML, with the full URL to the component JS:

```html
<div
  x-ignore
  ax-load="visible"
  ax-load-src="/assets/path-to-component.js"
  x-data="myComponent"
>
  <div x-text="message"></div>
</div>
```

This is particularly useful for platforms or websites that use asset versioning or an asset CDN where the component URL might not be known ahead of time in JS. For example this is required on Shopify sites where the above component would look like this:

```html
<div
  x-ignore
  ax-load="visible"
  ax-load-src="{% raw %}{{ 'my-component.js' | asset_url }}{% endraw %}"
  x-data="myComponent"
></div>
```
