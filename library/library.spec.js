const { get, memoize, createInvariantWithPrefix } = require('./library');

describe('library/get', () => {
  const DEFAULT_BREAKPOINTS = {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  };

  const PROPS_WITH_DEFAULT_THEME = {
    theme: {
      breakpoints: DEFAULT_BREAKPOINTS,
    },
  };
  it('should gets the value at path of object', () => {
    expect(get(PROPS_WITH_DEFAULT_THEME, 'theme.breakpoints')).toBe(
      DEFAULT_BREAKPOINTS
    );
  });

  it('If the resolved value is `undefined`, the `defaultValue` is returned in its place', () => {
    expect(get({ theme: {} }, 'theme.breakpoints', 1)).toBe(1);
  });
});

describe('library/memoize', () => {
  let add = null;
  let memoizedAdd = null;

  beforeEach(() => {
    add = jest.fn().mockImplementation((a, b) => a + b);
    memoizedAdd = memoize(add);
  });

  it('should return the result of a function', () => {
    expect(memoizedAdd(1, 2)).toBe(3);
  });

  it('should return the same result if the arguments have not changed', () => {
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 2)).toEqual(3);
  });

  it('should not execute the memoized function if the arguments have not changed', () => {
    memoizedAdd(1, 2);
    memoizedAdd(1, 2);
    expect(add).toHaveBeenCalledTimes(1);
  });

  it('should invalidate a memoize cache if new arguments are provided', () => {
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(2, 2)).toBe(4);
    expect(add).toHaveBeenCalledTimes(2);
  });

  it('should resume memoization after a cache invalidation', () => {
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(add).toHaveBeenCalledTimes(1);
    expect(memoizedAdd(2, 2)).toBe(4);
    expect(add).toHaveBeenCalledTimes(2);
    expect(memoizedAdd(2, 2)).toBe(4);
    expect(add).toHaveBeenCalledTimes(2);
  });
});

describe('invariant/throw-behavior', () => {
  let invariant = null;

  beforeEach(() => {
    invariant = createInvariantWithPrefix();
  });
  it('should not throw if the condition is truthy', () => {
    const truthy = [1, -1, true, {}, [], Symbol('test'), 'hi'];

    truthy.forEach((value) => expect(() => invariant(value)).not.toThrow());
  });

  it('should throw if the condition is falsy', () => {
    const falsy = [undefined, null, false, +0, -0, NaN, ''];

    falsy.forEach((value) => expect(() => invariant(value)).toThrow());
  });
});

describe('invariant/message-behavior', () => {
  describe('error prefix', () => {
    it('should include a provided message and an error prefix when an invariant does throw', () => {
      const invariant = createInvariantWithPrefix('[custom prefix]: ');

      expect(() => invariant(false, 'my message')).toThrow(
        '[custom prefix]: my message'
      );
    });
  });

  describe('message', () => {
    let invariant = null;
    const DEFAULT_ERROR_PREFIX = '[prefix]: ';

    beforeEach(() => {
      invariant = createInvariantWithPrefix();
    });
    it('should include a default message and default prefix when an invariant does throw and no message is provided', () => {
      expect(() => invariant(false)).toThrow(
        `${DEFAULT_ERROR_PREFIX}Invariant failed`
      );
    });

    it('should include a provided message when an invariant does throw', () => {
      expect(() => invariant(false, 'my message')).toThrow(
        `${DEFAULT_ERROR_PREFIX}my message`
      );
    });
  });
});
