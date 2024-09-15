---
title: Advanced — Async Alpine Documentation
description: Advanced options and usage for Async Alpine, delaying the initialisation of bundled or inline Alpine.js components and prefix customisation
---

# Advanced

## Delayed Initialisation {id=delayed-init}

Although the primary purpose of Async Alpine is to load JavaScript component modules, it could be useful to use it's capabilities for delayed initialisation of Alpine components or elements within a component. When an element doesn't have a download function declared via one of the [download methods](/docs/usage/), Async Alpine will manage the execution of the component when the loading strategy is met. This means you can use it with an empty or inline `x-data` component, or even any element within an Alpine component, like the following:

```html
<!-- delaying the initialisation of a component
with inline x-data until it's visible -->
<div
  x-load="visible"
  x-data="{
    message: 'loaded'
  }"
  x-html="message"
></div>

<!-- delaying the initialisation of an element within
a normal alpine component until it's visible -->
<div x-data>
  <div
    x-load="visible"
    x-html="'loaded'"
  ></div>
</div>
```

## Advanced Options {id=options}

Advanced options are provided with the `Alpine.asyncOptions()` function as an object. As an example here we change the default loading strategy:

```js
AsyncAlpine.init(Alpine, {
  defaultStrategy: 'visible'
})
```

For a script installation, advanced options can be specified by setting `window.AsyncAlpineOptions` to the object as above.

### Available Options

| Option Name          | property           | Default | Notes |
| -------------------- | ------------------ | ------- | ----- |
| Default Strategy     | `defaultStrategy`  | `eager` | Allows changing the strategy used when the `ax-load` attribute is empty. |
| Keep Relative URLs   | `keepRelativeURLs` | `false` | Don't convert relative URLs to be relative to the document. |

## Asset Loading {id=assets}

Async Alpine provides asynchronous loading of Alpine components, you may also want to load a component CSS or a non-Alpine JS file asynchronously.

You can do this with the Alpine plugin [Alpine.js - Lazy Load Assets](https://github.com/tanthammar/alpine-lazy-load-assets). This plugin adds Alpine.js directives to load CSS and JavaScript files when the component initialises.

Alternatively, it can be included within the initialisation of your component without a plugin:

```html
<div
	x-load="visible"
  x-data="{
    init() {
      const head = document.getElementsByTagName('head')[0]

      // add script
      const newScript = document.createElement('script')
      newScript.src = '/assets/my-asset.js'
      head.appendChild(newScript)

      // add CSS file
      const newCSS = document.createElement('link')
      newCSS.src = '/assets/my-asset.css'
      newCSS.rel = 'stylesheet'
      head.appendChild(newCSS)
    }
  }"
></div>
```