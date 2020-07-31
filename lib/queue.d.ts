/**
 * The values which has been in the queue longest is its head.
 * The most recent addition is the tail.
 */
declare class Queue<T> {
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
   * Calls `cb(value)` for each value in the queue.
   */
  forEach(cb: (T) => any);

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

export = Queue;
