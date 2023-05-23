const { memoize } = require('./memoize');

describe('memoize function', () => {
  it('returns a function', () => {
    const memoized = memoize(() => {});
    expect(typeof memoized).toBe('function');
  });

  it('returns the same value for the same arguments', () => {
    const fn = jest.fn((a, b) => a + b);
    const memoized = memoize(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('caches multiple arguments', () => {
    const fn = jest.fn((a, b, c) => a + b + c);
    const memoized = memoize(fn);

    expect(memoized(1, 2, 3)).toBe(6);
    expect(memoized(2, 3, 4)).toBe(9);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(memoized(1, 2, 3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('works with different types of arguments', () => {
    const fn = jest.fn((a, b, c) => a + b.length + c);
    const memoized = memoize(fn);

    expect(memoized(1, 'foo', true)).toBe(5);
    expect(memoized(1, 'foo', true)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized(1, 'foobar', true)).toBe(8);
    expect(memoized(1, 'foo', true)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('works with objects and arrays', () => {
    const fn = jest.fn((a, b, c) => a.x + b.length + c[0]);
    const memoized = memoize(fn);

    expect(memoized({ x: 1 }, 'foo', [true])).toBe(5);
    expect(memoized({ x: 1 }, 'foo', [true])).toBe(5);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized({ x: 2 }, 'foobar', [false])).toBe(8);
    expect(memoized({ x: 1 }, 'foo', [true])).toBe(5);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('does not cache errors', () => {
    const fn = jest.fn(() => {
      throw new Error();
    });
    const memoized = memoize(fn);

    expect(() => memoized(1)).toThrow();
    expect(() => memoized(1)).toThrow();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
