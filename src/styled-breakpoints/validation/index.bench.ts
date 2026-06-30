import { bench, describe } from 'vitest';
import { createStyledBreakpointsTheme } from '..';

describe('createStyledBreakpointsTheme dev benchmark', () => {
  bench('theme creation', () => {
    createStyledBreakpointsTheme();
  });

  describe('methods', () => {
    const theme = createStyledBreakpointsTheme();

    bench('breakpoints.up', () => {
      theme.breakpoints.up('md');
    });

    bench('breakpoints.down', () => {
      theme.breakpoints.down('md');
    });

    bench('breakpoints.between', () => {
      theme.breakpoints.between('md', 'lg');
    });

    bench('breakpoints.only', () => {
      theme.breakpoints.only('md');
    });
  });
});
