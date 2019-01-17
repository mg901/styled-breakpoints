import { calcMinWidthInPx, calcMaxWidthInPx } from '../src/calculators';
import { CUSTOM_THEME } from '../src/constants';

describe('calculators', () => {
  describe('calcMinWidthInPx', () => {
    it('calculate min with in pixels from defualt theme', () => {
      expect(calcMinWidthInPx(undefined, 'tablet')).toEqual('48em');
    });

    it('calculate min with in pixels from defualt theme', () => {
      expect(calcMinWidthInPx(CUSTOM_THEME, 'sm')).toEqual('48em');
    });
  });

  describe('calcMaxWidthInPx', () => {
    it('calculate max with in pixels from defualt theme', () => {
      expect(calcMaxWidthInPx(undefined, 'tablet')).toEqual('61.99875em');
    });
    it('calculate max with in pixels from defualt theme', () => {
      expect(calcMaxWidthInPx(CUSTOM_THEME, 'sm')).toEqual('61.99875em');
    });
  });
});
