import {
  eitherGetBreakVal,
  eitherGetNextBreakName,
  eitherGetNextBreakVal,
} from '../src/media-queries';
import { DEFAULT_BREAKS_MAP } from '../src/constants';

describe('media-queries', () => {
  describe('eitherGetBreakVal', () => {
    it('return breakpoint value if breakpoint name is valid', () => {
      expect(eitherGetBreakVal(DEFAULT_BREAKS_MAP, 'tablet').getOr()).toEqual(
        '768px',
      );
    });

    it('returns `true` if set invalid breakpoint name', () => {
      expect(eitherGetBreakVal(DEFAULT_BREAKS_MAP, '!!!').isLeft).toEqual(true);
    });
  });

  describe('eitherGetNextBreakName', () => {
    it('return next breakpoint name if breakpoint name is valid', () => {
      expect(
        eitherGetNextBreakName(DEFAULT_BREAKS_MAP, 'tablet').getOr(),
      ).toEqual('desktop');
    });

    it('returns `true` if set the last breakpoint', () => {
      expect(
        eitherGetNextBreakName(DEFAULT_BREAKS_MAP, 'lgDesktop').isLeft,
      ).toEqual(true);
    });

    it('returns `true` if set invalid breakpoint name', () => {
      expect(eitherGetNextBreakName(DEFAULT_BREAKS_MAP, '!!!').isLeft).toEqual(
        true,
      );
    });
  });

  describe('eitherGetNextBreakVal', () => {
    it('return next breakpoint value if breakpoint name is valid', () => {
      expect(
        eitherGetNextBreakVal(DEFAULT_BREAKS_MAP, 'tablet').getOr(),
      ).toEqual('991.98px');
    });

    it('returns `true` if the given Either instance is a Left', () => {
      expect(
        eitherGetBreakVal(DEFAULT_BREAKS_MAP, 'invalid break name').isLeft,
      ).toEqual(true);
    });

    it('returns `true` if the given Either instance is a Right', () => {
      expect(eitherGetBreakVal(DEFAULT_BREAKS_MAP, 'tablet').isRight).toEqual(
        true,
      );
    });
  });
});
