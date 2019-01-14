import {
  eitherGetBreakVal,
  eitherGetNextBreakName,
  eitherGetNextBreakVal,
} from '.';
import { defaultBreaks } from '../constants';

describe('media-queries', () => {
  describe('eitherGetBreakVal', () => {
    it('return breakpoint value if breakpoint name is valid', () => {
      expect(eitherGetBreakVal(defaultBreaks, 'phone').getOr()).toEqual(
        '576px',
      );
    });

    it('returns `true` if set invalid breakpoint name', () => {
      expect(eitherGetBreakVal(defaultBreaks, '!!!').isLeft).toEqual(true);
    });
  });

  describe('eitherGetNextBreakName', () => {
    it('return next breakpoint name if breakpoint name is valid', () => {
      expect(eitherGetNextBreakName(defaultBreaks, 'phone').getOr()).toEqual(
        'tablet',
      );
    });

    it('returns `true` if set the last breakpoint', () => {
      expect(eitherGetNextBreakName(defaultBreaks, 'lgDesktop').isLeft).toEqual(
        true,
      );
    });

    it('returns `true` if set invalid breakpoint name', () => {
      expect(eitherGetNextBreakName(defaultBreaks, '!!!').isLeft).toEqual(true);
    });
  });

  describe('eitherGetNextBreakVal', () => {
    it('return next breakpoint value if breakpoint name is valid', () => {
      expect(eitherGetNextBreakVal(defaultBreaks, 'phone').getOr()).toEqual(
        '767.98px',
      );
    });

    it('returns `true` if the given Either instance is a Left', () => {
      expect(
        eitherGetBreakVal(defaultBreaks, 'invalid break name').isLeft,
      ).toEqual(true);
    });

    it('returns `true` if the given Either instance is a Right', () => {
      expect(eitherGetBreakVal(defaultBreaks, 'tablet').isRight).toEqual(true);
    });
  });
});
