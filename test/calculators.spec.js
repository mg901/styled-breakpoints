import { calcMinWidthInPx, calcMaxWidthInPx } from '../src/calculators';
import { DEFAULT_BREAKS } from '../src/constants';

describe('calculators', () => {
  describe('calcMinWidthInPx', () => {
    it('calculate min with in pixels from default theme', () => {
      expect(calcMinWidthInPx('desktop', DEFAULT_BREAKS)).toEqual('62em');
    });
  });

  describe('calcMaxWidthInPx', () => {
    it('calculate max with in pixels from default theme', () => {
      expect(calcMaxWidthInPx('tablet', DEFAULT_BREAKS)).toEqual('61.99875em');
    });
  });
});
