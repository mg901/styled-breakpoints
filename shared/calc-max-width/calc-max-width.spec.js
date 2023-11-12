const { calcMaxWidth } = require('./calc-max-width');

describe('calcMaxWidth', () => {
  it('calculates the maximum breakpoint correctly', () => {
    expect(calcMaxWidth('100px')).toBe('99.98px');
  });
});
