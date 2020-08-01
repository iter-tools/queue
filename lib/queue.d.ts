/**
 * The values which has been in the queue longest is its head.
 * The most recent addition is the tail.
 */
declare class Queue<T> {
  /**
   * Returns true if `inst` is a `Queue`.
   * This does not necessarily imply instanceof, but the check
   * is safe across frame boundaries, as it is done by looking for
   * inst[Symbol.for('@iter-tools/queue')]
   */
  static isQueue(inst): boolean;

  /**
   * An optional iterable of `values` to be pushed into the queue
   * in sequence. If `null` or `undefined` are passed the queue will
   * have no initial values.
   */
  constructor(values?: Iterable<T> | null);

  /**
   * The number of values in the queue
   */
  readonly size: number;

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
  push(value: T): void;

  /**
   * Calls `cb(value, index, queue)` for each value in the queue.
   */
  forEach(cb: (value: T, index: number, queue: Queue) => any): void;

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
   * Yields an `[index,value]` tuple for each value in the list.
   */
  entries(): IterableIterator<[number, T]>;

  /**
   * The default iterator. Equivalent to `values()`.
   */
  [Symbol.iterator](): IterableIterator<T>;
}

export = Queue;
