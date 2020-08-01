# @iter-tools/queue

[![Build Status](https://travis-ci.org/iter-tools/queue.svg?branch=trunk)](https://travis-ci.org/iter-tools/queue)
[![codecov](https://codecov.io/gh/iter-tools/queue/branch/trunk/graph/badge.svg)](https://codecov.io/gh/iter-tools/queue)

A simple es6 linked FIFO queue in the pattern of es6 `Map` and `Set`. Includes typescript libdefs. Suitable for node or browser environments. Supports native es imports in `node > 13.2`.

## Usage

```js
const Queue = require('@iter-tools/queue'); // OR
import Queue from '@iter-tools/queue';

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

Until Typescript supports [package exports](https://github.com/microsoft/TypeScript/issues/33079) you must enable `esModuleInterop` to use this module.

## API

```ts
/**
 * The values which has been in the queue longest is its head.
 * The most recent addition is the tail.
 */
class Queue<T> {
  /**
   * Returns true if `inst` is a Queue.
   * This does not necessarily imply instanceof, but the check
   * is safe across frame boundaries, as it is done by looking for
   * Queue[Symbol.for('@iter-tools/queue')]
   */
  static isQueue(inst): boolean;

  /**
   * An optional iterable of `values` to be pushed into the queue
   * in sequence. If `null` or `undefined` are passed the queue will
   * have no initial values.
   */
  constructor(values?: Iterable<T>);

  /**
   * The number of values in the queue
   */
  size: number;

  /**
   * Empties the queue of all values.
   */
  clear();

  /**
   * Returns the value at the head of the queue.
   */
  peek(): T | undefined;

  /**
   * Removes the value at the head of the queue and returns it.
   */
  shift(): T | undefined;

  /**
   * Adds `value` at the tail of the queue.
   */
  push(value: T);

  /**
   * Calls `cb(value, index, queue)` for each value in the queue.
   */
  forEach(
    cb: (value: T, index: number, queue: Queue) => any,
  );

  /**
   * Yields sequential 0-based indexes, one for each queued value.
   * The index 0 indicates the head.
   */
  keys(): IterableIterator<number>;

  /**
   * Yields the queued values from head to tail.
   */
  values(): IterableIterator<T>;

  /**
   * Yields `[index, value]` tuples for each value in the queue.
   */
  entries(): IterableIterator<[number, T]>;

  /**
   * The default iterator. Equivalent to `values()`.
   */
  [Symbol.iterator](): IterableIterator<T>;
}
```
