import { expectTypeOf, describe, it } from 'vitest';
import { useMediaQuery } from './index';

describe('useMediaQuery types', () => {
  it('infers second argument type correctly', () => {
    const result = useMediaQuery('(min-width: 100px)', {
      getServerSnapshot: () => true,
    });

    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  it('second argument is optional', () => {
    const result = useMediaQuery('(min-width: 100px)');

    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  it('accepts custom getServerSnapshot return type boolean', () => {
    useMediaQuery('(min-width: 100px)', {
      getServerSnapshot: () => false,
    });
  });
});
