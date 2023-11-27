import { describe, it, expect } from 'vitest';
import { calcMaxWidth } from './calc-max-width';

describe('calcMaxWidth', () => {
  it('calculates the maximum breakpoint correctly', () => {
    // Act and Assert
    expect(calcMaxWidth('100px')).toBe('99.98px');
  });
});
