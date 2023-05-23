/**
 * @jest-environment jsdom
 */
const { renderHook, act } = require('@testing-library/react');
const { mockViewport } = require('jsdom-testing-mocks');
const { createStyledBreakpointsTheme } = require('../../styled-breakpoints');
const { useMediaQuery } = require('./use-media-query');

describe('useMediaQuery hook', () => {
  let theme = null;
  let DEFAULT_BREAKPOINTS = null;
  let calcMaxWidth = null;

  beforeAll(() => {
    theme = createStyledBreakpointsTheme();
    DEFAULT_BREAKPOINTS = {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    };

    calcMaxWidth = (value) => `${parseInt(value, 10) - 0.02}px`;
  });

  describe('up', () => {
    it('should return true if the screen width is equal to the specified breakpoint', () => {
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.up('md'))
      );

      expect(result.current).toBe(false);

      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.md,
        });
      });

      expect(result.current).toBe(true);
      viewport.cleanup();
    });
  });
  describe('down', () => {
    it('should return true if the screen width is less than the specified breakpoint', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.md,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.down('md'))
      );

      expect(result.current).toBe(false);

      act(() => {
        viewport.set({
          width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
        });
      });

      expect(result.current).toBe(true);
      viewport.cleanup();
    });

    it('should return false if screen width is greater than 768px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.lg,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.down('md'))
      );

      expect(result.current).toBe(false);
      viewport.cleanup();
    });
  });
  describe('between', () => {
    it('should return true if the screen width is between the specified breakpoints', () => {
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.sm),
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.between('sm', 'md'))
      );

      expect(result.current).toBe(false);

      act(() => {
        viewport.set({
          width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
        });
      });

      expect(result.current).toBe(true);

      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.md,
        });
      });

      expect(result.current).toBe(false);
      viewport.cleanup();
    });
  });

  describe('only', () => {
    it('should return true if the screen width matches the specified breakpoint', () => {
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.only('md'))
      );

      expect(result.current).toBe(false);

      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.md,
        });
      });

      expect(result.current).toBe(true);

      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.lg,
        });
      });

      expect(result.current).toBe(false);
      viewport.cleanup();
    });
  });
});
