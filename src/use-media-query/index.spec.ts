import { configure, renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './index';

// ─── Mock ────────────────────────────────────────────────────────────────────

type Listener = (e: { matches: boolean; media: string }) => void;

class MediaQueryListMock {
  media: string;

  matches: boolean;

  _listeners: Set<Listener> = new Set();

  constructor(media: string, matches: boolean) {
    this.media = media;
    this.matches = matches;
  }

  addEventListener(event: string, listener: Listener) {
    if (event === 'change') {
      this._listeners.add(listener);
    }
  }

  removeEventListener(event: string, listener: Listener) {
    if (event === 'change') {
      this._listeners.delete(listener);
    }
  }

  _simulateChange(matches: boolean) {
    this.matches = matches;

    const event = {
      matches,
      media: this.media,
    };

    this._listeners.forEach((listener) => listener(event));
  }
}

let mqls: Map<string, MediaQueryListMock>;

function setupMatchMedia(initialMatches: Record<string, boolean> = {}) {
  mqls = new Map();

  window.matchMedia = vi.fn((query: string) => {
    let mql = mqls.get(query);

    if (!mql) {
      mql = new MediaQueryListMock(query, initialMatches[query] ?? false);
      mqls.set(query, mql);
    }

    return mql as unknown as MediaQueryList;
  });
}

const mql = (query: string) => mqls.get(query);

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('useMediaQuery', () => {
  beforeAll(() => {
    configure({
      reactStrictMode: true,
    });
  });

  beforeEach(() =>
    setupMatchMedia({
      '(min-width: 500px)': true,
      '(min-width: 1000px)': false,
    })
  );

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('is active when the viewport satisfies the query', () => {
      const { result } = renderHook(() => {
        return useMediaQuery('(min-width: 500px)');
      });

      expect(result.current).toBe(true);
    });

    it('is inactive when the viewport does not satisfy the query', () => {
      const { result } = renderHook(() => {
        return useMediaQuery('(min-width: 1000px)');
      });

      expect(result.current).toBe(false);
    });
  });

  describe('when the query string changes', () => {
    it('adapts to the new query on re-render', () => {
      // Arrange
      const { result, rerender } = renderHook(
        ({ query }) => useMediaQuery(query),
        { initialProps: { query: '(min-width: 500px)' } }
      );

      expect(result.current).toBe(true);

      // Act
      rerender({ query: '(min-width: 1000px)' });

      // Assert
      expect(result.current).toBe(false);
    });

    it('accepts queries with and without the @media prefix', () => {
      renderHook(() => {
        return useMediaQuery('@media (min-width: 500px)');
      });

      expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 500px)');
      expect(window.matchMedia).not.toHaveBeenCalledWith(
        '@media (min-width: 500px)'
      );
    });
  });

  describe('when the viewport changes', () => {
    it('stays accurate across multiple consecutive changes', () => {
      // Arrange
      const { result } = renderHook(() => {
        return useMediaQuery('(min-width: 500px)');
      });

      act(() => {
        return mql('(min-width: 500px)')!._simulateChange(false);
      });
      expect(result.current).toBe(false);

      act(() => {
        return mql('(min-width: 500px)')!._simulateChange(true);
      });

      expect(result.current).toBe(true);
    });
  });

  describe('on unmount', () => {
    it('unsubscribes from the media query', () => {
      // Arrange
      const { unmount } = renderHook(() => {
        return useMediaQuery('(min-width: 500px)');
      });

      // Act
      unmount();

      // Assert
      expect(mql('(min-width: 500px)')!._listeners.size).toBe(0);
    });
  });

  describe('with multiple instances', () => {
    it('instances tracking different queries remain independent', () => {
      // Arrange
      const { result: narrow } = renderHook(() => {
        return useMediaQuery('(min-width: 500px)');
      });

      const { result: wide } = renderHook(() => {
        return useMediaQuery('(min-width: 1000px)');
      });

      // Act
      act(() => mql('(min-width: 500px)')!._simulateChange(false));

      // Assert
      expect(narrow.current).toBe(false);
      expect(wide.current).toBe(false);
    });
  });
});
