import { errorReport, pxToEm, getBreakNames, makeErrorMessage } from '.';
import { DEFAULT_BREAKS } from '../constants';

describe('helpers', () => {
  describe('errorReport', () => {
    it('return object Error with error message', () => {
      expect(errorReport).toThrow();
    });
  });

  describe('pxToEm', () => {
    it('convert values from pixels to ems', () => {
      expect(pxToEm('16px')).toEqual('1em');
    });
  });

  describe('getBreakNames', () => {
    it('return array with names of breakpoints', () => {
      expect(getBreakNames(DEFAULT_BREAKS)).toEqual([
        'phone',
        'tablet',
        'desktop',
        'lgDesktop',
      ]);
    });
  });

  describe('makeErrorMessage', () => {
    it('return string with error message', () => {
      expect(makeErrorMessage('xs', DEFAULT_BREAKS)).toEqual(
        "'xs' is invalid breakpoint name. Use 'phone, tablet, desktop, lgDesktop'.",
      );
    });
  });
});
