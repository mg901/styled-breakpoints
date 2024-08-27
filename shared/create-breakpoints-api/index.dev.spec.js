import { describe, beforeAll, it, expect } from 'vitest';
import { DEFAULT_BREAKPOINTS } from '../constants';
import { createBreakpointsApi } from './index.dev';
import { calcMaxWidth } from '../calc-max-width';

const ERROR_PREFIX = '[breakpoints]: ';
const INVALID_BREAKPOINT_KEY = 'invalid';
const EXPECTED_ERROR_MESSAGE_FOR_INVALID_KEY = `${ERROR_PREFIX}Breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in ${Object.keys(
  DEFAULT_BREAKPOINTS
).join(', ')}.`;

const EXPECTED_ERROR_MESSAGE_FOR_MAX_VALUE = `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`;

describe('createBreakpointsApi', () => {
  describe('development environment', () => {
    describe('breakpoints validation', () => {
      it('does not throw an error if all breakpoints are valid', () => {
        // Act
        const received = () =>
          createBreakpointsApi({
            breakpoints: DEFAULT_BREAKPOINTS,
            errorPrefix: ERROR_PREFIX,
          });

        // Assert
        expect(received).not.toThrow();
      });

      it('throws an error if invalid breakpoints are found', () => {
        // Arrange
        const invalidBreakpoints = {
          xs: '0px',
          sm: '576px',
          md: 'wtf',
          lg: '992',
          xl: 'px1200',
          xxl: '1400px',
        };

        const expected = `${ERROR_PREFIX}The following breakpoints are invalid: \`md: wtf, lg: 992, xl: px1200\`. Use values with pixel units (e.g., '200px').`;

        // Act
        const received = () =>
          createBreakpointsApi({
            breakpoints: invalidBreakpoints,
            errorPrefix: ERROR_PREFIX,
          });

        // Assert
        expect(received).toThrow(expected);
      });
    });

    describe('methods', () => {
      // Arrange
      let up = null;
      let down = null;
      let between = null;
      let breakpointsApi = null;

      // Arrange
      beforeAll(() => {
        breakpointsApi = createBreakpointsApi({
          breakpoints: DEFAULT_BREAKPOINTS,
          errorPrefix: ERROR_PREFIX,
        });

        up = breakpointsApi.up;
        down = breakpointsApi.down;
        between = breakpointsApi.between;
      });

      describe('up', () => {
        it('throws an error for an invalid breakpoint key', () => {
          // Act
          const received = () => up(INVALID_BREAKPOINT_KEY);

          // Assert
          expect(received).toThrow(EXPECTED_ERROR_MESSAGE_FOR_INVALID_KEY);
        });

        // Arrange
        const testCases = Object.entries(DEFAULT_BREAKPOINTS);

        it.each(testCases)(
          'returns the correct minimum value for breakpoint %s',
          (key, value) => {
            // Act and Assert
            expect(breakpointsApi.up(key)).toBe(value);
          }
        );
      });

      describe('down', () => {
        it('throws an error for an invalid breakpoint key', () => {
          // Act
          const received = () => down(INVALID_BREAKPOINT_KEY);

          // Assert
          expect(received).toThrow(EXPECTED_ERROR_MESSAGE_FOR_INVALID_KEY);
        });

        it('throws an error when the value is equal 0', () => {
          // Arrange
          const expected = `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`;

          // Act and Assert
          expect(() => down('xs')).toThrow(expected);
        });

        // Arrange
        const { xs, ...rest } = DEFAULT_BREAKPOINTS;
        const testCases = Object.entries(rest);

        it.each(testCases)(
          'calculates the correct maximum value for breakpoint %s',
          (key, value) => {
            // Act
            const received = breakpointsApi.down(key);

            // Assert
            expect(received).toBe(calcMaxWidth(value));
          }
        );
      });

      describe('between', () => {
        it('throws an error for invalid breakpoint keys', () => {
          // Act
          const receivedForFirst = () => between(INVALID_BREAKPOINT_KEY, 'sm');

          // Assert
          expect(receivedForFirst).toThrow(
            EXPECTED_ERROR_MESSAGE_FOR_INVALID_KEY
          );

          // Act
          const receivedForSecond = () => between('sm', INVALID_BREAKPOINT_KEY);

          // Assert
          expect(receivedForSecond).toThrow(
            EXPECTED_ERROR_MESSAGE_FOR_INVALID_KEY
          );
        });

        it('throws an error when the last breakpoint less than max breakpoint', () => {
          // Act
          const received = () => between('xl', 'xs');

          // Assert
          expect(received).toThrow(EXPECTED_ERROR_MESSAGE_FOR_MAX_VALUE);
        });

        it('does not throw an error when max is equal to min value', () => {
          // Act
          const received = () => between('sm', 'sm');

          // Assert
          expect(received).not.toThrow(EXPECTED_ERROR_MESSAGE_FOR_MAX_VALUE);
        });
      });
    });
  });
});
