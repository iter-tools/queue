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
    const emptyItem = new QueueItem(null);

    this[_] = { size: 0, head: emptyItem, tail: emptyItem };

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

  peek() {
    if (!this.size) return undefined;
    return this[_].head.next.value;
  }

  shift() {
    if (!this.size) return undefined;
    const { head } = this[_];
    const { value } = head.next;
    this[_].head = head.next;
    this[_].size--;

    return value;
  }

  push(value) {
    const { tail } = this[_];
    tail.next = this[_].tail = new QueueItem(value);
    this[_].size++;
  }

  *[Symbol.iterator]() {
    let item = this[_].head;
    for (let i = 0; i < this[_].size; i++) {
      item = item.next;
      yield item.value;
    }
  }

  forEach(cb, thisArg) {
    if (thisArg != null) {
      cb = cb.bind(thisArg);
    }
    for (const value of this) cb(value);
  }
}

module.exports = Queue;
