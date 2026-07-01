import { createStyledBreakpointsTheme as createTheme } from '../create-theme';
import { withValidation } from './with-validation';

export type Orientation = 'landscape' | 'portrait';

describe('withValidation(createStyledBreakpointsTheme) types', () => {
  const createStyledBreakpointsTheme = withValidation(createTheme);

  it('returns default breakpoint theme type', () => {
    type DefaultBreakpointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

    expectTypeOf(createStyledBreakpointsTheme()).toEqualTypeOf<
      Readonly<{
        breakpoints: Readonly<{
          keys: readonly string[];
          up: (min: DefaultBreakpointKeys, orientation?: Orientation) => string;
          down: (
            max: DefaultBreakpointKeys,
            orientation?: Orientation
          ) => string;
          between: (
            min: DefaultBreakpointKeys,
            max: DefaultBreakpointKeys,
            orientation?: Orientation
          ) => string;
          only: (
            key: DefaultBreakpointKeys,
            orientation?: Orientation
          ) => string;
        }>;
      }>
    >();
  });

  it('returns custom breakpoint theme type', () => {
    type BreakpointKeys = 'mobile' | 'tablet';

    expectTypeOf(
      createStyledBreakpointsTheme({
        breakpoints: {
          values: {
            mobile: '0px',
            tablet: '600px',
          },
        },
      })
    ).toEqualTypeOf<
      Readonly<{
        breakpoints: Readonly<{
          keys: readonly string[];
          up: (min: BreakpointKeys, orientation?: Orientation) => string;
          down: (max: BreakpointKeys, orientation?: Orientation) => string;
          between: (
            min: BreakpointKeys,
            max: BreakpointKeys,
            orientation?: Orientation
          ) => string;
          only: (key: BreakpointKeys, orientation?: Orientation) => string;
        }>;
      }>
    >();
  });
});
