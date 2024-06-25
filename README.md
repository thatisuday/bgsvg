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
  backgroundColor: "#222299",
  color: "#952E9D",
  thickness: 4,
  min: 35,
  max: 40,
  bidirectional: true,
});

console.log(svg);
// <svg xmlns="http://www.w3.org/2000/svg" width="800" height="300" viewBox="0 0 800 300"...
```

<img src="./assets/meteors.png" style="max-width: 100%">
