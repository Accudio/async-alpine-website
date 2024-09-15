---
title: Loading Strategies — Async Alpine Documentation
description: "The different methods of loading Alpine.js components using Async Alpine: eager loading, idle, when visible, on media query or event, or combined"
---

# Strategies

Async Alpine loads components according to different 'Strategies'. These strategies allow you specify the conditions that would cause a component to download. By default any components on the page will be immediately downloaded, but instead you could load a component when it enters the viewport, for certain media queries, in response to events and more.

[Strategies can also be combined](#combined) for really advanced and specific behaviour!

## Eager

The default strategy if not specified, if the component is present on the page loading will be kicked off immediately. It will still load asynchronously in the background but with the highest priority possible. This will behave similarly to default Alpine behaviour and will ensure the component is interactive as soon as possible.

**Best used** to reduce the impact of loading large components that aren't present on the page, whilst still loading them as fast as possible when they are present. If your component isn't within the first view or is not extremely high priority consider using [idle](#idle) or [visible](#visible).

Usage examples:

```html
<div
  x-load
  x-data="myHeroComponent"
></div>

<div
  x-load="eager"
  x-data="navigation"
></div>
```

## Idle

Uses `requestIdleCallback` where it's supported to load when the main thread is less busy. Where [`requestIdleCallback` isn't supported](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback#browser_compatibility) (Safari currently) we use an arbitrary `200ms` delay to wait until the main thread has hopefully cleared up.

**Best used** for components that aren't critical to the initial paint/load. Waiting until the main thread is less busy will allow more important work&mdash;including `eager` components, other JS and image/font loading&mdash;to have priority.

Usage example:

```html
<div
  x-load="idle"
  x-data="productCarousel"
></div>
```

## Visible

Uses `IntersectionObserver` to only load when the component is in view, similar to lazy-loading images.

If you want to start downloading the component when the browser *approaches* the component you can specify `rootMargin` in brackets as in the below example. Read more about [IntersectionObserver and rootMargin on MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver).

**Best used** for components that aren't 'above the fold' or in view on the first load to only load them if and when they're needed.

Usage examples:

```html
<div
  x-load="visible"
  x-data="componentName"
></div>

<!-- using custom `rootMargin` -->
<div
  x-load="visible (100px 100px 100px 100px)"
  x-data="componentName"
></div>
```

## Media

The component will be loaded when the provided media query evalutes as true.

Provide your media query in brackets as in the below examples. The relies on `window.matchMedia`, which supports all media queries you might use in CSS.

**Best used** for when components are only interactive based on certain conditions. The most common use-case is based on viewport width, but all media queries are available including prefers-reduced-motion, orientation and more.

Usage examples:

```html
<div
  x-load="media (max-width: 820px)"
  x-data="componentName"
></div>

<div
  x-load="media (prefers-reduced-motion: no-preference)"
  x-data="componentName"
></div>
```

## Event

The component won't be loaded until it receives an event on `window`. Provide the event name to listen for in brackets, or emit the `async-alpine:load` event with the the `id` of the component in `detail.id`.

This can be used for many different cases, the most simple would be loading a component on the click of a button. As it's flexible however you can implement your own conditions and trigger to load the component if you wanted.

**Best used** for when the other strategies (or a combination) don't meet your needs, or when responding to events from another library.

Usage examples:

```html
<!-- on a button click using Alpine's $dispatch -->
<button x-data @click="$dispatch('async-alpine:load', { id: 'my-component-1' })">Load component</button>
<div
  id="my-component-1"
  x-load="event"
  x-data="componentName"
></div>

<!-- load our component after another library emits the `another-library-init` event -->
<div
  x-load="event (another-library-init)"
  x-data="componentName"
></div>
```

## Combine strategies {id=combined}

Strategies can be combined together for more advanced and customisable loading behaviour. Note that this doesn't check the requirements *at the same time*, but that they have fired at some point before.

You can combine strategies using a basic logic expression using `&&` (AND), `||` (OR) and brackets.

For example, you can make a component load when it is visible and either an event has been fired or the screen is >1024px wide. You could use this for a component that appears on a larger screen when it's visible but is behind a button click on a smaller device.

```html
<div
  x-load="visible && (event || media (min-width: 1024px))"
  x-load-src="/assets/path-to-component.js"
  x-data="componentName"
></div>
```

In versions before v1.1, the only logical operator available was AND, specified as a single pipe `|`. This still works in the latest version but we recommend using the more explicit `&&` for new strategies.