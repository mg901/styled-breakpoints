/* istanbul ignore file */
import { describe, it, assertType, expectTypeOf } from 'vitest';
import { useMediaQuery } from './index';

describe('useMediaQuery hook', () => {
  it('should be a function', () => {
    expectTypeOf(useMediaQuery).toBeFunction();

    // @ts-expect-error
    assertType(expectTypeOf(useMediaQuery).toBeUndefined());

    // @ts-expect-error
    assertType(useMediaQuery(42));
  });
});
