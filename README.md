# @iter-tools/queue

[![Build Status](https://travis-ci.org/iter-tools/queue.svg?branch=trunk)](https://travis-ci.org/iter-tools/queue)
[![codecov](https://codecov.io/gh/iter-tools/queue/branch/trunk/graph/badge.svg)](https://codecov.io/gh/iter-tools/queue)

A simple es6 linked FIFO queue in the pattern of es6 `Map` and `Set`. Includes typescript libdefs. Suitable for node or browser environments.

## Usage

```js
const Queue = require('@iter-tools/queue');

const q = new Queue([1, 2, 3]);
q.push(4);
[...q]; // [1, 2, 3, 4]
q.size; // 4
q.shift(); // 1
q.shift(); // 2
q.shift(); // 3
q.shift(); // 4
q.size; // 0
q.shift(); // undefined
```

## API

```ts
/**
 * The values which has been in the queue longest is its head.
 * The most recent addition is the tail.
 */
class Queue<T> {
  /**
   * An optional iterable of `values` to be pushed
   * into the queue in sequence. If `null` or `undefined` are
   * passed the queue will have no initial values.
   */
  constructor(values?: Iterable<T>);

  /**
   * Returns true if `inst` is a Queue.
   * This does not necessarily imply instanceof, but the check
   * is safe across frame boundaries, as it is done by looking for
   * Queue[Symbol.for('@iter-tools/queue')]
   */
  static isQueue(inst);

  /**
   * The number of values in the queue
   */
  size: number;

  /**
   * Returns the value at the head of the queue.
   */
  peek(): T;

  /**
   * Removes the value at the head of the queue and returns it.
   */
  shift(): T;

  /**
   * Adds `value` at the tail of the queue.
   */
  push(value: T);

  /**
   * Calls `cb(value)` for each value in the queue.
   * If `thisArg` is specified and not null it will be used
   * as the `this` value for each callback.
   */
  forEach(cb: (T) => any, thisArg: any);

  [Symbol.iterator](): IterableIterator<T>;
}
```
