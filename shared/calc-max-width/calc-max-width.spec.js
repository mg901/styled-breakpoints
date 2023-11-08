const { calcMaxWidth } = require('./calc-max-width');

describe('calcMaxWidth', () => {
  it('should calculate the maximum breakpoint correctly', () => {
    expect(calcMaxWidth('100px')).toBe('99.98px');
  });
});
