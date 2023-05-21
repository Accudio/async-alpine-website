---
title: Loading Strategies — Async Alpine Documentation
description: "The different methods of loading Alpine.js components using Async Alpine: eager loading, idle, when visible, on media query or event, or combined"
---

# Strategies

Async Alpine loads components according to different 'Strategies'. These strategies allow you specify the conditions that would cause a component to download. By default any components on the page will be immediately downloaded, but instead you could load a component when it enters the viewport, for certain media queries, in response to events and more.

Strategies can also be combined for really advanced and specific behaviour!

## Eager

The default strategy if not specified, if the component is present on the page loading will be kicked off immediately. It will still load asynchronously in the background but with the highest priority possible. This will behave similar to default Alpine behaviour and will ensure the component is interactive as soon as possible.

**Best used** to reduce the impact of loading large components that aren't present on the page, whilst still loading them as fast as possible when they are present. If your component isn't within the first view or is not extremely high priority consider using [idle](#idle) or [visible](#visible).

Usage examples:

```html
<div
  x-ignore
  ax-load
  x-data="componentName"
></div>

<div
  x-ignore
  ax-load="eager"
  x-data="componentName"
></div>
```

## Idle

Uses `requestIdleCallback` where it's supported to load when the main thread is less busy. Where [`requestIdleCallback` isn't supported](https://caniuse.com/requestidlecallback) (Safari currently) we use an arbitrary `200ms` delay to wait until the main thread has hopefully cleared up.

**Best used** for components that aren't critical to the initial paint/load. Waiting until the main thread is less busy will allow more important work&mdash;including `eager` components, other JS and image/font loading&mdash;to have priority.

Usage example:

```html
<div
  x-ignore
  ax-load="idle"
  x-data="componentName"
></div>
```

## Visible

Uses `IntersectionObserver` to only load when the component is in view, similar to lazy-loading images.

If you want to start downloading the component when the browser *approaches* the component you can specify `rootMargin` in brackets as in the below example. Read more about [IntersectionObserver and rootMargin on MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver).

**Best used** for components that aren't 'above the fold' or in view on the first load to only load them if and when they're needed.

Usage examples:

```html
<div
  x-ignore
  ax-load="visible"
  x-data="componentName"
></div>

<!-- using custom `rootMargin` -->
<div
  x-ignore
  ax-load="visible (100px 100px 100px 100px)"
  x-data="componentName"
></div>
```

## Media

The component will be loaded when the provided media query evalutes as true.

Provide your media query in brackets as in the below examples. The relies on `window.matchMedia`, which supports all media queries you might use in CSS.

**Best used** for when components are only interactive based on certain conditions. The most common use-case is based on screen size, but all CSS queries are available including prefers-reduced-motion, orientation and more.

Usage examples:

```html
<div
  x-ignore
  ax-load="media (max-width: 820px)"
  x-data="componentName"
></div>

<div
  x-ignore
  ax-load="media (prefers-reduced-motion: no-preference)"
  x-data="componentName"
></div>
```

## Event

The component won't be loaded until it receives the `async-alpine:load` event on `window`. Provide the `id` of the component in `detail.id`.

This can be used for many different cases, the most simple would be loading a component on the click of a button. As it's flexible however you can implement your own conditions and trigger to load the component if you wanted.

**Best used** for when the other strategies (or a combination) don't quite load components when you need them.

Usage examples:

```html
<!-- on a button click using Alpine's $dispatch -->
<button x-data @click="$dispatch('async-alpine:load', { id: 'my-component-1' })">Load component</button>
<div
  id="my-component-1"
  x-ignore
  ax-load="event"
  x-data="componentName"
></div>

<!-- load our component after `another-library-init` has loaded -->
<script>
window.addEventListener('another-library-init', () => {
  window.dispatchEvent(new CustomEvent('async-alpine:load', {
    detail: {
      id: 'my-component-2'
    }
  }))
})
</script>
<div
  id="my-component-2"
  x-ignore
  ax-load="media (prefers-reduced-motion: no-preference)"
  x-data="componentName"
></div>
```

## Combine strategies {id=combined}

Strategies can be combined together for more advanced and customisable loading behaviour. Note that this doesn't check the requirements *at the same time*, but that they have fired at some point before.

### Since v1.1 {id=combined-1.1}

You can combine strategies using a basic logic expression using `&&` (AND), `||` (OR) and brackets. This allows for more customisable loading strategies that would have required custom events before version 1.1.

For example, you can make a component load when it is visible and either an event has been fired or the screen is >1024px wide. You could use this for a component that appears on a larger screen when it's visible but is behind a button click on a smaller device.

```html
<div
  ax-load="visible && (event || media (min-width: 1024px))"
  ax-load-src="/assets/path-to-component.js"
  x-data="componentName"
></div>
```

To remain backwards-compatible with pre v1.1 behaviour, a single pipe `|` maps to `&&` (AND). We recommend using the more explicit `&&` for new strategies.

### Before v1.1 {id=combined-pre-1.1}

When you combine strategies with a pipe `|` character the component will load when all conditions are true. In this case only when the CPU has become idle, the component is visible and the screen is > 1024px wide.

```html
<div
  ax-load="idle | visible | media (min-width: 1024px)"
  ax-load-src="/assets/path-to-component.js"
  x-data="componentName"
></div>
```
