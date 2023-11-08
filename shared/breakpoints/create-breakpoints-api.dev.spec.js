const { DEFAULT_BREAKPOINTS } = require('../constants');
const { createBreakpointsApi } = require('./create-breakpoints-api.dev');

describe('breakpoints function', () => {
  const ERROR_PREFIX = '[breakpoints]: ';
  const INVALID_BREAKPOINT_KEY = 'invalid';

  const breakpointsApi = createBreakpointsApi({
    breakpoints: DEFAULT_BREAKPOINTS,
    errorPrefix: ERROR_PREFIX,
  });

  describe('in development', () => {
    describe('breakpoints validation', () => {
      it('should not throw an error if all breakpoints are valid', () => {
        // Act
        const result = () =>
          createBreakpointsApi({
            breakpoints: DEFAULT_BREAKPOINTS,
            errorPrefix: ERROR_PREFIX,
          });

        // Assert
        expect(result).not.toThrowError();
      });

      it('should throw an error if invalid breakpoints are found', () => {
        // Arrange
        const invalidBreakpoints = {
          xs: '0px',
          sm: '576px',
          md: 'wtf',
          lg: '992',
          xl: 'px1200',
          xxl: '1400px',
        };

        // Act
        const result = () =>
          createBreakpointsApi({
            breakpoints: invalidBreakpoints,
            errorPrefix: ERROR_PREFIX,
          });

        // Assert
        expect(result).toThrowError(
          `${ERROR_PREFIX}The following breakpoints are invalid: \`md: wtf, lg: 992, xl: px1200\`. Use values with pixel units (e.g., '200px').`
        );
      });
    });

    describe('up method', () => {
      it('should throw an error for an invalid breakpoint key', () => {
        // Act
        const result = () => breakpointsApi.up(INVALID_BREAKPOINT_KEY);

        // Assert
        expect(result).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });
    });

    describe('down method', () => {
      it('should throw an error for an invalid breakpoint key', () => {
        // Act
        const result = () => breakpointsApi.down(INVALID_BREAKPOINT_KEY);
        // Assert
        expect(result).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });

      it('should throw an error when the value is equal 0', () => {
        // Act
        const result = () => breakpointsApi.down('xs');

        // Assert
        expect(result).toThrow(
          `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
        );
      });
    });

    describe('between method', () => {
      it('should throw an error for invalid breakpoint keys', () => {
        // Act and Assert
        expect(() =>
          breakpointsApi.between(INVALID_BREAKPOINT_KEY, 'sm')
        ).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );

        // Act and Assert
        expect(() =>
          breakpointsApi.between('sm', INVALID_BREAKPOINT_KEY)
        ).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });

      it('should throw an error when the last breakpoint less than max breakpoint', () => {
        // Act and Assert
        expect(() => breakpointsApi.between('xl', 'xs')).toThrow(
          `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`
        );
      });

      it('does not throw an error when max is equal to min value', () => {
        // Act and Assert
        expect(() => breakpointsApi.between('sm', 'sm')).not.toThrow(
          `${ERROR_PREFIX}The \`max\` value cannot be less than the \`min\`.`
        );
      });
    });

    describe('only method', () => {
      // Act and Assert
      it('should throw an error for an invalid breakpoint key', () => {
        // Act
        const result = () => breakpointsApi.only(INVALID_BREAKPOINT_KEY);

        // Assert
        expect(result).toThrowError(
          `${ERROR_PREFIX}breakpoint \`${INVALID_BREAKPOINT_KEY}\` not found in xs, sm, md, lg, xl, xxl.`
        );
      });
    });
  });
});
