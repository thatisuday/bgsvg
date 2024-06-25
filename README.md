# Random SVG background generator

Generate beautiful random SVG backgrounds on Node.js runtime.

## Installation

```bash
npm i -S bgsvg
# or
yarn add bgsvg
```

### Install peer dependencies

```bash
npm i -S chroma-js@2.4.2 happy-dom@14.12.3
# or
yarn add chroma-js@2.4.2 happy-dom@14.12.3
```

## Supported SVG backgrounds

## Meteors

```ts
import { meteors } from "bgsvg";

const svg = meteors({
  width: 800,
  height: 300,
  color: "#952E9D",
  background: "#222299",
  min: 35,
  max: 40,
  thickness: 4,
  bidirectional: true,
});

console.log(svg);
// <svg xmlns="http://www.w3.org/2000/svg" width="800" height="300" viewBox="0 0 800 300"...
```

<img src="./assets/meteors.svg" style="max-width: 100%">

## rain

```ts
import { rain } from "bgsvg";

const svg = rain({
  width: 800,
  height: 300,
  color: "#952E9D",
  // background: "#222299",
  background: {
    colors: ["#081e46", "#181f74"],
  },
  dropsX: 20,
  dropsY: 15,
  thickness: 1,
});

console.log(svg);
// <svg xmlns="http://www.w3.org/2000/svg" width="800" height="300" viewBox="0 0 800 300"...
```

<img src="./assets/rain.svg" style="max-width: 100%">

# Development

## Installation

```bash
yarn install
```

## Preview server

```bash
yarn preview
```

This commands starts an express server at `http://localhost:3003` to display how the SVGs would look like.
