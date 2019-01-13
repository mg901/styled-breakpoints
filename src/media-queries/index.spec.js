import {
  eitherGetBreakVal,
  eitherGetNextBreakName,
  eitherGetNextBreakVal,
} from '.';
import { errorReport } from '../helpers';
import { DEFAULT_BREAKS } from '../constants';

describe('media-queries', () => {
  describe('eitherGetBreakVal', () => {
    it('return breakpoint value if breakpoint name is valid', () => {
      expect(
        eitherGetBreakVal(DEFAULT_BREAKS, 'phone').fold(errorReport, (x) => x),
      ).toEqual('576px');
    });
  });

  describe('eitherGetNextBreakName', () => {
    it('return next breakpoint name if breakpoint name is valid', () => {
      expect(
        eitherGetNextBreakName(DEFAULT_BREAKS, 'phone').fold(
          errorReport,
          (x) => x,
        ),
      ).toEqual('tablet');
    });
  });

  describe('eitherGetNextBreakVal', () => {
    it('return next breakpoint value if breakpoint name is valid', () => {
      expect(
        eitherGetNextBreakVal(DEFAULT_BREAKS, 'phone').fold(
          errorReport,
          (x) => x,
        ),
      ).toEqual('767.98px');
    });
  });
});
