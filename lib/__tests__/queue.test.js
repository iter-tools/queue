const Queue = require('../queue.cjs');

function* wrap(array) {
  yield* array;
}

describe('Queue', () => {
  it('is iterable', () => {
    expect([...new Queue()]).toEqual([]);
  });

  it('can be constructed with initial values', () => {
    expect([...new Queue(wrap([1, 2, 3]))]).toEqual([1, 2, 3]);
    expect([...new Queue(undefined)]).toEqual([]);
    expect([...new Queue(null)]).toEqual([]);
  });

  it('can clear values', () => {
    const q = new Queue([1, 2, 3]);

    const iter = q[Symbol.iterator]();

    q.clear();
    expect([...q]).toEqual([]);
    expect([...iter]).toEqual([]);
  });

  it('can shift the values that are pushed to it', () => {
    const q = new Queue();
    expect(q.push(1)).toBe(undefined);
    q.push(2);
    q.push(3);
    expect(q.shift()).toBe(1);
    expect(q.shift()).toBe(2);
    expect(q.shift()).toBe(3);

    expect(q.shift()).toBe(undefined);

    q.push(1);
    expect(q.shift()).toBe(1);
  });

  it('can peek values', () => {
    expect(new Queue().peek()).toBe(undefined);
    expect(new Queue([1, 2, 3]).peek()).toBe(1);
  });

  it('has a size property', () => {
    expect(new Queue(wrap([1, 2, 3])).size).toBe(3);

    const q = new Queue();
    expect(q.size).toBe(0);
    q.shift();
    expect(q.size).toBe(0);
    q.push(1);
    expect(q.size).toBe(1);
  });

  it('has a forEach method', () => {
    const cb = jest.fn();

    const q = new Queue([1, 2, 3]);

    q.forEach(cb);

    expect(cb.mock.calls).toEqual([
      [1, 0, q],
      [2, 1, q],
      [3, 2, q],
    ]);
  });

  it('forEach may receive a thisArg for cb', () => {
    const thisArg = {};
    const makeCb = (thisArg) =>
      function cb() {
        expect(this).toBe(thisArg);
      };

    new Queue([null]).forEach(makeCb(thisArg), thisArg);
    new Queue([null]).forEach(makeCb(window), null);
    new Queue([null]).forEach(makeCb(window), undefined);

    expect.assertions(3);
  });

  it("flags queues using Symbol.for('@iter-tools/queue')", () => {
    expect(new Queue()[Symbol.for('@iter-tools/queue')]).toBe(true);
  });

  it('can detect queues with isQueue', () => {
    expect(Queue.isQueue(new Queue())).toBe(true);
  });

  it('has a keys iterator', () => {
    expect([...new Queue([]).keys()]).toEqual([]);
    expect([...new Queue([1, 2, 3]).keys()]).toEqual([0, 1, 2]);
  });

  it('has a values iterator', () => {
    expect([...new Queue([]).values()]).toEqual([]);
    expect([...new Queue([1, 2, 3]).values()]).toEqual([1, 2, 3]);
  });

  it('has an entries iterator', () => {
    expect([...new Queue([]).entries()]).toEqual([]);
    expect([...new Queue([1, 2, 3]).entries()]).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
  });
});
