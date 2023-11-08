const { calcMaxWidth } = require('./calc-max-width'); // Замените 'your-module' на путь к вашему модулю

describe('calcMaxWidth', () => {
  // Arrange
  const testCases = [
    ['576px', '575.98px'],
    ['768px', '767.98px'],
    ['992px', '991.98px'],
    ['1200px', '1199.98px'],
    ['1400px', '1399.98px'],
  ];

  it.each(testCases)(
    'should calculate the maximum breakpoint width correctly for %s',
    (input, expected) => {
      // Act and Assert
      expect(calcMaxWidth(input)).toBe(expected);
    }
  );
});
