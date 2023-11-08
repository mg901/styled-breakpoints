/**
 * @jest-environment jsdom
 */
const { renderHook, act } = require('@testing-library/react');
const { mockViewport } = require('jsdom-testing-mocks');
const { createStyledBreakpointsTheme } = require('../../styled-breakpoints');
const { useMediaQuery } = require('./use-media-query');
const { calcMaxWidth } = require('../../shared/calc-max-width');
const { DEFAULT_BREAKPOINTS } = require('../../shared/constants');

describe('useMediaQuery hook', () => {
  const theme = createStyledBreakpointsTheme();

  describe('useMediaQuery with theme breakpoints', () => {});

  describe('with up method as argument', () => {
    it('should return true if the screen width is equal to the specified breakpoint', () => {
      // Arrange
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      // Act
      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.up('md'))
      );

      // Assert
      expect(result.current).toBe(false);

      // Act
      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.md,
        });
      });

      // Assert
      expect(result.current).toBe(true);

      viewport.cleanup();
    });
  });

  describe('with down method as argument', () => {
    it('should return true if the screen width is less than the specified breakpoint', () => {
      // Arrange
      const viewport = mockViewport({
        width: DEFAULT_BREAKPOINTS.md,
      });

      // Act
      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.down('md'))
      );

      // Assert
      expect(result.current).toBe(false);

      // Act
      act(() => {
        viewport.set({
          width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
        });
      });

      // Assert
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

  describe('with between method as argument', () => {
    it('should return true if the screen width is between the specified breakpoints', () => {
      // Arrange
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.sm),
      });

      // Act
      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.between('sm', 'md'))
      );

      // Assert
      expect(result.current).toBe(false);

      // Act
      act(() => {
        viewport.set({
          width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
        });
      });

      // Assert
      expect(result.current).toBe(true);

      // Act
      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.md,
        });
      });

      // Assert
      expect(result.current).toBe(false);

      viewport.cleanup();
    });
  });

  describe('with only method as argument', () => {
    it('should return true if the screen width matches the specified breakpoint', () => {
      // Arrange
      const viewport = mockViewport({
        width: calcMaxWidth(DEFAULT_BREAKPOINTS.md),
      });

      // Act
      const { result } = renderHook(() =>
        useMediaQuery(theme.breakpoints.only('md'))
      );

      // Assert
      expect(result.current).toBe(false);

      // Act
      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.md,
        });
      });

      // Assert
      expect(result.current).toBe(true);

      // Act
      act(() => {
        viewport.set({
          width: DEFAULT_BREAKPOINTS.lg,
        });
      });

      // Assert
      expect(result.current).toBe(false);

      viewport.cleanup();
    });
  });
});
