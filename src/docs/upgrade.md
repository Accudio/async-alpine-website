---
title: Upgrade Guide — Async Alpine Documentation
description: Guide on how to upgrade Async Alpine to a newer version
---

# Upgrade Guide

## Version 2

With Async Alpine 2 the package has switched from a 'wrapper' to using Alpine.js's normal plugin functionality. That means there are a few changes to how it's initialised, components are loaded, and attribute names.

### Initialisation

For installation, CDN users should update the CDN URL from `1.x.x` to `2.x.x`. The 2.x JSDelivr URL is:

```text
https://cdn.jsdelivr.net/npm/async-alpine@2.x.x/dist/async-alpine.script.js
```

NPM users should upgrade to version 2 with `npm install async-alpine@latest`.

You will also need to change how it it initialised within your main JavaScript, removing the previous lines and adding `Alpine.plugin(AsyncAlpine)`:

```diff-js
  import AsyncAlpine from 'async-alpine';
  import Alpine from 'alpinejs';
- AsyncAlpine.init(Alpine);
- AsyncAlpine.start();
+ Alpine.plugin(AsyncAlpine);
  Alpine.start();
```

### HTML attributes

A couple of HTML attribute renames are required on your components, changing `ax-load` to `x-load`. The syntax of the value remains the same:

```diff-html
  <div
    x-data="myComponent"
-   ax-load="visible"
-   ax-load-src="/assets/path-to-component.js"
+   x-load="visible"
+   x-load-src="/assets/path-to-component.js"
  ></div>
```

`x-ignore` will now be automatically added to all components — including dynamically added components. This means you don't need to specify if yourself, but there is no harm in doing so.

These changes are required due to being implemented as proper Alpine.js directives using the configured prefix (default `x-`). *If you have a different prefix for Alpine.js use that instead*. You should be able to safely do a search + replace across your codebase for `ax-load` → `x-load`.

### Loading components

Loading inline components is unaffected. The function names for loading components within JS has changed. All arguments remain the same.

- `AsyncAlpine.url` → `Alpine.asyncUrl`
- `AsyncAlpine.data` → `Alpine.asyncData`
- `AsyncAlpine.alias` → `Alpine.asyncAlias`

### Options

Options are now specified using the `Alpine.asyncOptions` function, and `prefix` and `alpinePrefix` have been removed. Use [Alpine.prefix](https://github.com/alpinejs/alpine/discussions/2042#discussioncomment-1304957) to configure your prefix for both.

```js
Alpine.asyncOptions({
	defaultStrategy: 'visible'
})
Alpine.asyncUrl(...) // etc
```