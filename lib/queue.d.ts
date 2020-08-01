/// <reference lib="es6" />

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
  static isQueue(inst: any): boolean;

  constructor(values?: Iterable<T> | null);

  readonly size: number;

  clear(): void;

  peek(): T | undefined;

  shift(): T | undefined;

  push(value: T): void;

  forEach(cb: (value: T, index: number, queue: Queue<T>) => any): void;

  keys(): IterableIterator<number>;

  values(): IterableIterator<T>;

  entries(): IterableIterator<[number, T]>;

  [Symbol.iterator](): IterableIterator<T>;
}

export default Queue;
