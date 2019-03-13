import {
  errorReporter,
  pxToEm,
  getBreakNames,
  makeErrorMessage,
} from '../src/helpers';
import { DEFAULT_BREAKS_MAP } from '../src/constants';

describe('helpers', () => {
  describe('errorReporter', () => {
    it('return object Error with error message', () => {
      try {
        errorReporter()('error message');
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(`[styled-breakpoints]: error message`);
      }
    });

    it('return object Error with custom error message', () => {
      try {
        errorReporter('custom')('error message');
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe(`[custom]: error message`);
      }
    });
  });

  describe('pxToEm', () => {
    it('convert values from pixels to ems', () => {
      expect(pxToEm('16px')).toEqual('1em');
    });
  });

  describe('getBreakNames', () => {
    it('return array with names of breakpoints', () => {
      expect(getBreakNames(DEFAULT_BREAKS_MAP)).toEqual([
        'tablet',
        'desktop',
        'lgDesktop',
      ]);
    });
  });

  describe('makeErrorMessage', () => {
    it('return string with error message', () => {
      expect(makeErrorMessage('xs', DEFAULT_BREAKS_MAP)).toEqual(
        "'xs' is invalid breakpoint name. Use 'tablet, desktop, lgDesktop'.",
      );
    });
  });
});
