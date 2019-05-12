# deep-omit

[![npm](https://img.shields.io/npm/v/deep-omit.svg)](https://www.npmjs.com/package/deep-omit)
[![Travis (.com)](https://img.shields.io/travis/com/risenforces/deep-omit.svg)](https://travis-ci.com/risenforces/deep-omit)

Recursively omit the specified key or keys from an object.

## Installation

Install with [npm](https://www.npmjs.com)

```sh
npm install deep-omit
```

## Usage

```js
const omit = require("deep-omit")
```

**omit a value:**

```js
const obj = { one: 1, two: 2 }
omit(obj, 'one')
// or
omit(obj, ['one'])
// result: { two: 2 }
```

**omit a nested value:**

```js
const obj = { one: 1, nested: { two: 2 } }
omit(obj, 'nested.two')
// result: { one: 1, nested: {} }
```

**omit multiple values:**

```js
const obj = { one: 1, two: 2, nested: { two: 2 } }
omit(obj, ['one', 'two'])
// result: { nested: { two: 2 } }
// note that it didn't delete 'nested.two' how any other 'omit' library doing
```

**works with array as well:**

```js
const arr = ['one', 'two', 'three']
omit(arr, 1)
// or
omit(arr, ['1'])
// result: ['one', 'three']
```

**and with nested arrays:**

```js
const arr = ['one', 'two', ['three']]
omit(arr, ['2.0'])
// result: ['one', 'two', []]
```

## Running tests

```sh
npm i && npm test
```