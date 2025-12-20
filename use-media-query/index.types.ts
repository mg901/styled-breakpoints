/* istanbul ignore file */

import { describe, it, expectTypeOf } from 'vitest';
import { useMediaQuery } from './index';

describe('useMediaQuery hook', () => {
  it('should be a function', () => {
    expectTypeOf(useMediaQuery).toBeFunction();
  });

  it('accepts query as a string', () => {
    expectTypeOf(useMediaQuery).parameter(0).toEqualTypeOf<string>();
  });

  it('accepts optional options object', () => {
    expectTypeOf(useMediaQuery)
      .parameter(1)
      .toEqualTypeOf<
        { defaultValue?: boolean; initializeWithValue?: boolean } | undefined
      >();
  });

  it('returns a boolean type', () => {
    const MEDIA_QUERY = '@media (min-width: 600px)';
    expectTypeOf(useMediaQuery(MEDIA_QUERY)).toBeBoolean();
  });
});
