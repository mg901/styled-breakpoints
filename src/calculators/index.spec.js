import { calcMinWidthInPx, calcMaxWidthInPx } from '.';
import { THEME_WITH_DEFAULT_BREAKS } from '../constants';

describe('calculators', () => {
  describe('calcMinWidthInPx', () => {
    it('calculate min with in pixels', () => {
      expect(calcMinWidthInPx(THEME_WITH_DEFAULT_BREAKS, 'tablet')).toEqual(
        '48em',
      );
    });
  });

  describe('calcMaxWidthInPx', () => {
    it('calculate max with in pixels', () => {
      expect(calcMaxWidthInPx(THEME_WITH_DEFAULT_BREAKS, 'tablet')).toEqual(
        '61.99875em',
      );
    });
  });
});
