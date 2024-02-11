/* istanbul ignore file */

import { describe, it, assertType, expectTypeOf } from 'vitest';
import { useMediaQuery } from './index';

describe('useMediaQuery hook', () => {
  it('should be a function', () => {
    // Act and Assert
    expectTypeOf(useMediaQuery).toBeFunction();

    // @ts-expect-error
    assertType(expectTypeOf(useMediaQuery).toBeUndefined());
  });

  it('accepts a string type', () => {
    // Act and Assert
    expectTypeOf(useMediaQuery).parameter(0).toMatchTypeOf<string>();

    // @ts-expect-error
    expectTypeOf(useMediaQuery(42));
  });

  it('returns a boolean type', () => {
    // Arrange
    const MEDIA_QUERY = '@media (min-width: 600px)';

    // Act and Assert
    expectTypeOf(useMediaQuery(MEDIA_QUERY)).toBeBoolean();

    // @ts-expect-error
    assertType(expectTypeOf(useMediaQuery(MEDIA_QUERY)).toBeString());
  });
});
