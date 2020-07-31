declare class Queue<T> {
  /**
   * An optional iterable of `values` to be pushed into the queue in sequence. If `null` or `undefined` are passed the queue will have no initial values.
   */
  constructor(values?: Iterable<T>);

  size: number;

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
   * Calls `cb(value)` for each value in the queue
   */
  forEach(cb: (T) => any);

  [Symbol.iterator](): IterableIterator<T>;
}
