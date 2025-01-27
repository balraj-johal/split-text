# Split Text

GSAP-like text splitting class.

It supports:

- splitting text into lines, words, and chars
- CJT locales
- nested HTML elements (with all the types of splits 😉)
- text balancing
- emoji

[Demo](https://activetheory.github.io/split-text/)

## Installation

```bash
npm install @activetheory/split-text
```

## Usage

```js
import SplitText from '@activetheory/split-text';

const el = document.querySelector('.el');

const splitTextInstance = new SplitText(el);
```

## Options

- `el`: The element to split.
- `type`: The type of split to perform. Can be `lines`, `words`, or `chars`. Defaults to `lines`.
- `minLines`: The minimum number of lines to split. Defaults to `1`.
- `lineThreshold`: The threshold for splitting lines. Defaults to `0.2`.
- `noAriaLabel`: Whether to not add .sr-only content. Defaults to `false`.
- `noBalance`: Whether to not balance the text using @activetheory/balance-text. Defaults to `false`.
- `balanceRatio`: The ratio of the width of the element to the width of the parent. Defaults to `1`.
- `handleCJT`: Whether to handle CJT characters. Defaults to `false`.

## Properties

- `isSplit`: Whether the text has been split.
- `chars`: The characters of the text.
- `words`: The words of the text.
- `lines`: The lines of the text.
- `originals`: The original elements of the text.

## Methods

- `split()`: Split the text.
- `revert()`: Revert the text to the original.

## Demo

See the [demo](./demo) folder for examples.
To run the demo, run `npm run dev`.

## Notes

### CJT locales

The `handleCJT` option will leverage `&ZeroWidthSpace;` to split the text properly.
We suggest to have a look at https://github.com/google/budoux/ for more information about how to place `&ZeroWidthSpace;` in your text.
