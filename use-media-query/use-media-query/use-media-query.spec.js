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
    it('should return true if screen is equal 768px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.md,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.up('md'))
      );

      expect(result.current).toBe(true);
      viewport.cleanup();
    });

    it('should return false if screen width is less than 1200px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.md,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.up('lg'))
      );

      expect(result.current).toBe(false);
      viewport.cleanup();
    });

    it('should return true if screen is greater than 768px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.lg,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.up('md'))
      );

      expect(result.current).toBe(true);
      viewport.cleanup();
    });

    it('should update when viewport changes', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.xl,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.up('xl'))
      );

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
  describe('down', () => {
    it('should return true if screen width is less than 768px', () => {
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.down('md'))
      );

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
    it('should return true if screen width is between 576px and 768px', () => {
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.between('sm', 'md'))
      );

      expect(result.current).toBe(true);
      viewport.cleanup();
    });

    it('should return false if screen width is less than 768px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.sm,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.between('md', 'lg'))
      );

      expect(result.current).toBe(false);
      viewport.cleanup();
    });

    it('should return false if screen width is greater than 768px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.lg,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.between('sm', 'md'))
      );

      expect(result.current).toBe(false);
      viewport.cleanup();
    });
  });
  describe('only', () => {
    it('should return true if screen width is 768px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.md,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.only('md'))
      );

      expect(result.current).toBe(true);
      viewport.cleanup();
    });

    it('should return false if screen width is less than 576px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.xs,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.only('md'))
      );

      expect(result.current).toBe(false);
      viewport.cleanup();
    });

    it('should return false if screen width is greater than 768px', () => {
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.lg,
      });

      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.only('md'))
      );

      expect(result.current).toBe(false);
      viewport.cleanup();
    });
  });
});
