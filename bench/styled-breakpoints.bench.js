import { bench, describe } from 'vitest';
import { createStyledBreakpointsTheme } from '../styled-breakpoints/create-styled-breakpoints-theme';
import { createBreakpoints } from '../core/create-breakpoints';
import { calcMaxWidth } from '../core/calc-max-width';

const CUSTOM_BREAKPOINTS = {
  mobile: '0px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
  wide: '1920px',
};

describe('createStyledBreakpointsTheme', () => {
  bench('create theme with default breakpoints', () => {
    createStyledBreakpointsTheme();
  });

  bench('create theme with custom breakpoints', () => {
    createStyledBreakpointsTheme({
      errorPrefix: '[styled-breakpoints]: ',
      breakpoints: CUSTOM_BREAKPOINTS,
    });
  });
});

describe('breakpoint media queries', () => {
  const { breakpoints } = createStyledBreakpointsTheme();

  bench('up', () => {
    breakpoints.up('md');
  });

  bench('down', () => {
    breakpoints.down('lg');
  });

  bench('between', () => {
    breakpoints.between('sm', 'xl');
  });

  bench('only', () => {
    breakpoints.only('md');
  });

  bench('up with orientation', () => {
    breakpoints.up('md', 'landscape');
  });

  bench('mixed queries across all breakpoints', () => {
    const keys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    keys.forEach((key) => {
      breakpoints.up(key);
      breakpoints.only(key);
    });

    breakpoints.down('xxl');
    breakpoints.between('sm', 'xl');
  });
});

describe('core createBreakpoints', () => {
  bench('create and resolve breakpoints', () => {
    const bp = createBreakpoints({
      errorPrefix: '[styled-breakpoints]: ',
      breakpoints: CUSTOM_BREAKPOINTS,
    });

    bp.up('tablet');
    bp.down('laptop');
    bp.between('tablet', 'desktop');
  });
});

describe('calcMaxWidth', () => {
  bench('calculate max width', () => {
    calcMaxWidth('768px');
  });
});
