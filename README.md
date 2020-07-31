# @iter-tools/queue

A simple linked queue in the style of es6 data structures.

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
 * FIFO Queue. The values which has been in the queue longest is its head. The most recent addition is the tail.
 */
class Queue<T> {
  /**
   * An optional iterable of `values` to be pushed into the queue in sequence. If `null` or `undefined` are passed the queue will have no initial values.
   */
  constructor(values?: Iterable<T>);

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
   * Calls `cb(value)` for each value in the queue
   */
  forEach(cb: (T) => any);

  [Symbol.iterator](): IterableIterator<T>;
}
```
