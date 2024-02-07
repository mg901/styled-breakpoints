/* istanbul ignore file */

import { describe, it, assertType, expectTypeOf } from 'vitest';
import { createStyledBreakpointsTheme } from './index';

describe('createStyledBreakpointsTheme', () => {
  it('should be a function', () => {
    expectTypeOf(createStyledBreakpointsTheme).toBeFunction();

    // @ts-expect-error
    expectTypeOf(assertType(createStyledBreakpointsTheme)).toBeUndefined();
  });

  describe('options', () => {
    it('infers correct types for the default config', () => {
      type Breakpoints = Record<string, `${string}px`>;
      type ErrorPrefix = `[${string}]: `;

      type Options<T extends Breakpoints> = {
        breakpoints?: T;
        errorPrefix?: ErrorPrefix;
      };

      expectTypeOf(createStyledBreakpointsTheme)
        .parameter(0)
        .toMatchTypeOf<Options<Breakpoints> | undefined>();
    });

    it('throws a type error if the breakpoints type is passed', () => {
      assertType(
        createStyledBreakpointsTheme({
          // @ts-expect-error
          breakpoints: '100em',
        })
      );
    });

    it('throws a type error if the errorPrefix type is passed', () => {
      assertType(
        createStyledBreakpointsTheme({
          // @ts-expect-error
          errorPrefix: 'incorrect prefix',
        })
      );
    });
  });

  describe('breakpoints', () => {
    // Arrange
    type Orientation = 'landscape' | 'portrait';

    describe('default breakpoints', () => {
      // Arrange
      const theme = createStyledBreakpointsTheme();

      type Min = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
      type Max = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

      describe('up', () => {
        // Act and Assert
        expectTypeOf(theme.breakpoints.up).parameters.toMatchTypeOf<
          [min: Min, orientation?: Orientation]
        >();

        // @ts-expect-error
        assertType(theme.breakpoints.up('42'));
      });

      describe('down', () => {
        // Act and Assert
        expectTypeOf(theme.breakpoints.down).parameters.toMatchTypeOf<
          [max: Max, orientation?: Orientation]
        >();

        // @ts-expect-error
        assertType(theme.breakpoints.down('xs'));
      });

      describe('only', () => {
        // Act and Assert
        expectTypeOf(theme.breakpoints.only).parameters.toMatchTypeOf<
          [key: Min, orientation?: Orientation]
        >();

        // @ts-expect-error
        assertType(theme.breakpoints.only('42'));
      });

      describe('between', () => {
        it('infers default breakpoints correctly', () => {
          // Act and Assert
          expectTypeOf(theme.breakpoints.between).parameters.toMatchTypeOf<
            [min: Min, max: Max, orientation?: Orientation]
          >();

          // @ts-expect-error
          assertType(theme.breakpoints.between('xs', 'xs'));
        });
      });
    });

    describe('custom breakpoints', () => {
      // Arrange
      const theme = createStyledBreakpointsTheme({
        breakpoints: {
          small: '0px',
          medium: '640px',
          large: '1024px',
          xLarge: '1200px',
          xxLarge: '1440px',
        },
      });

      type Min = 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';
      type Max = 'medium' | 'large' | 'xLarge' | 'xxLarge';

      describe('up', () => {
        // Act and Assert
        expectTypeOf(theme.breakpoints.up).parameters.toMatchTypeOf<
          [min: Min, orientation?: Orientation]
        >();

        // @ts-expect-error
        assertType(theme.breakpoints.up('42'));
      });

      describe('down', () => {
        // Act and Assert
        expectTypeOf(theme.breakpoints.down).parameters.toMatchTypeOf<
          [max: Max, orientation?: Orientation]
        >();

        // @ts-expect-error
        assertType(theme.breakpoints.down('small'));
      });

      describe('only', () => {
        // Act and Assert
        expectTypeOf(theme.breakpoints.only).parameters.toMatchTypeOf<
          [key: Min, orientation?: Orientation]
        >();

        // @ts-expect-error
        assertType(theme.breakpoints.only('42'));
      });

      describe('between', () => {
        it('infers default breakpoints correctly', () => {
          // Act and Assert
          expectTypeOf(theme.breakpoints.between).parameters.toMatchTypeOf<
            [min: Min, max: Max, orientation?: Orientation]
          >();

          // @ts-expect-error
          assertType(theme.breakpoints.between('small', 'small'));
        });
      });
    });
  });
});
