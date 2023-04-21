const { get, memoize, createInvariantWithPrefix } = require('./library');

describe('get function', () => {
  it('should returns value of the first level property', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(get(obj, 'a')).toBe(1);
  });

  it('should returns value of the nested property', () => {
    const obj = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    expect(get(obj, 'a.b.c')).toBe(1);
  });

  it('should returns undefined if property is not found', () => {
    const obj = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    expect(get(obj, 'a.b.d')).not.toBeDefined();
  });

  it('should returns default value if property is not found', () => {
    const obj = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    expect(get(obj, 'a.b.d', 2)).toBe(2);
  });

  it('should returns value of the array element', () => {
    const obj = {
      a: {
        b: [{ c: 1 }, { c: 2 }],
      },
    };

    expect(get(obj, 'a.b[1].c')).toBe(2);
  });

  it('should returns default value if array element is not found', () => {
    const obj = {
      a: {
        b: [{ c: 1 }, { c: 2 }],
      },
    };

    expect(get(obj, 'a.b[2].c', 3)).toBe(3);
  });
});

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

describe('createInvariantWithPrefix function', () => {
  it('should throw an error with the default error prefix if the condition is false', () => {
    const invariant = createInvariantWithPrefix();
    expect(() => invariant(false)).toThrowError('[prefix]: Invariant failed');
  });

  it('should throw an error with the specified error prefix if the condition is false', () => {
    const CUSTOM_PREFIX = 'Custom prefix: ';
    const invariant = createInvariantWithPrefix(CUSTOM_PREFIX);

    expect(() => invariant(false)).toThrowError(
      `${CUSTOM_PREFIX}Invariant failed`
    );
  });

  it('should not throw if the condition is truthy', () => {
    const invariant = createInvariantWithPrefix();
    const truthy = [1, -1, true, {}, [], Symbol('test'), 'hi'];

    truthy.forEach((value) => expect(() => invariant(value)).not.toThrow());
  });

  it('should throw if the condition is falsy', () => {
    const invariant = createInvariantWithPrefix();
    const falsy = [undefined, null, false, +0, -0, NaN, ''];

    falsy.forEach((value) => expect(() => invariant(value)).toThrow());
  });
});
