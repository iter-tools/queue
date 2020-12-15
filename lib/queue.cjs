class QueueItem {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const _ = Symbol.for('_');
const flag = Symbol.for('@iter-tools/queue');

class Queue {
  constructor(values) {
    this.clear();

    // Mirrors the behavior of Map and Set
    if (values != null) {
      for (const value of values) {
        this.push(value);
      }
    }
  }

  static isQueue(inst) {
    return inst != null && inst[flag];
  }

  get [flag]() {
    return true;
  }

  get size() {
    return this[_].size;
  }

  clear() {
    const emptyItem = new QueueItem(null);

    if (this[_]) this[_].cleared = true;
    this[_] = { size: 0, cleared: false, head: emptyItem, tail: emptyItem };
  }

  peek() {
    if (this.size === 0) return undefined;
    return this[_].head.next.value;
  }

  shift() {
    if (this.size === 0) return undefined;
    const { head } = this[_];
    const { value, next } = head.next;
    if (next === null) {
      this[_].tail = head;
    }
    head.next = next;
    this[_].size--;

    return value;
  }

  push(value) {
    const { tail } = this[_];
    tail.next = this[_].tail = new QueueItem(value);
    this[_].size++;
  }

  [Symbol.iterator]() {
    return this.values();
  }

  *keys() {
    const __ = this[_];
    let item = __.head;
    let i = 0;
    while ((item = item.next) !== null && !__.cleared) {
      yield i++;
    }
  }

  *values() {
    const __ = this[_];
    let item = __.head;
    while ((item = item.next) !== null && !__.cleared) {
      yield item.value;
    }
  }

  *entries() {
    const __ = this[_];
    let item = __.head;
    let i = 0;
    while ((item = item.next) !== null && !__.cleared) {
      yield [i, item.value];
      i++;
    }
  }

  forEach(cb, thisArg) {
    if (thisArg != null) {
      cb = cb.bind(thisArg);
    }
    for (const [key, value] of this.entries()) cb(value, key, this);
  }
}

module.exports = Queue;
