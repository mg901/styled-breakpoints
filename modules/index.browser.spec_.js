// // @vitest-environment jsdom

// import {
//   describe,
//   beforeAll,
//   beforeEach,
//   afterEach,
//   vi,
//   it,
//   expect,
// } from 'vitest';
// import { configure, renderHook, act } from '@testing-library/react';
// import { useMediaQuery } from './index';

// // ─── Mock ────────────────────────────────────────────────────────────────────

// class MediaQueryListMock {
//   constructor(query, matches) {
//     this.media = query;
//     this.matches = matches;
//     this._listeners = new Set();
//   }

//   addEventListener(event, listener) {
//     if (event === 'change') this._listeners.add(listener);
//   }

//   removeEventListener(event, listener) {
//     this._listeners.delete(listener);
//   }

//   _simulateChange(matches) {
//     this.matches = matches;
//     this._listeners.forEach((fn) => {
//       fn({
//         matches,
//         media: this.media,
//       });
//     });
//   }
// }

// let mqls;

// function setupMatchMedia(initialMatches = {}) {
//   mqls = new Map();

//   window.matchMedia = vi.fn((query) => {
//     if (!mqls.has(query)) {
//       mqls.set(
//         query,
//         new MediaQueryListMock(
//           query,
//           initialMatches[query] !== undefined ? initialMatches[query] : false
//         )
//       );
//     }

//     return mqls.get(query);
//   });
// }

// const mql = (query) => mqls.get(query);

// // ─── Tests ───────────────────────────────────────────────────────────────────

// describe.todo('useMediaQuery', () => {
//   beforeAll(() => {
//     configure({
//       reactStrictMode: true,
//     });
//   });

//   beforeEach(() =>
//     setupMatchMedia({
//       '(min-width: 500px)': true,
//       '(min-width: 1000px)': false,
//     })
//   );

//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   describe('initial state', () => {
//     it('is active when the viewport satisfies the query', () => {
//       const { result } = renderHook(() => {
//         return useMediaQuery('(min-width: 500px)');
//       });

//       expect(result.current).toBe(true);
//     });

//     it('is inactive when the viewport does not satisfy the query', () => {
//       const { result } = renderHook(() => {
//         return useMediaQuery('(min-width: 1000px)');
//       });

//       expect(result.current).toBe(false);
//     });

//     it('defaults to inactive for unrecognised queries', () => {
//       const { result } = renderHook(() => {
//         return useMediaQuery('(min-width: 9999px)');
//       });

//       expect(result.current).toBe(false);
//     });
//   });

//   describe('when the query string changes', () => {
//     it('adapts to the new query on re-render', () => {
//       // Arrange
//       const { result, rerender } = renderHook(
//         ({ query }) => useMediaQuery(query),
//         { initialProps: { query: '(min-width: 500px)' } }
//       );

//       expect(result.current).toBe(true);

//       // Act
//       rerender({ query: '(min-width: 1000px)' });

//       // Assert
//       expect(result.current).toBe(false);
//     });

//     it('accepts queries with and without the @media prefix', () => {
//       renderHook(() => {
//         return useMediaQuery('@media (min-width: 500px)');
//       });

//       expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 500px)');
//       expect(window.matchMedia).not.toHaveBeenCalledWith(
//         '@media (min-width: 500px)'
//       );
//     });
//   });

//   describe('when the viewport changes', () => {
//     it('reacts to a change event in real time', () => {
//       // Arrange
//       const { result } = renderHook(() => {
//         return useMediaQuery('(min-width: 1000px)');
//       });

//       expect(result.current).toBe(false);

//       // Act
//       act(() => mql('(min-width: 1000px)')._simulateChange(true));

//       // Assert
//       expect(result.current).toBe(true);
//     });

//     it('stays accurate across multiple consecutive changes', () => {
//       // Arrange
//       const { result } = renderHook(() => {
//         return useMediaQuery('(min-width: 500px)');
//       });

//       act(() => {
//         return mql('(min-width: 500px)')._simulateChange(false);
//       });
//       expect(result.current).toBe(false);

//       act(() => {
//         return mql('(min-width: 500px)')._simulateChange(true);
//       });
//       expect(result.current).toBe(true);
//     });
//   });

//   describe('on unmount', () => {
//     it('unsubscribes from the media query', () => {
//       // Arrange
//       const { unmount } = renderHook(() => {
//         return useMediaQuery('(min-width: 500px)');
//       });

//       // Act
//       unmount();

//       // Assert
//       expect(mql('(min-width: 500px)')._listeners.size).toBe(0);
//     });
//   });

//   describe('with multiple instances', () => {
//     it('instances tracking different queries remain independent', () => {
//       // Arrange
//       const { result: narrow } = renderHook(() => {
//         return useMediaQuery('(min-width: 500px)');
//       });

//       const { result: wide } = renderHook(() => {
//         return useMediaQuery('(min-width: 1000px)');
//       });

//       // Act
//       act(() => mql('(min-width: 500px)')._simulateChange(false));

//       // Assert
//       expect(narrow.current).toBe(false);
//       expect(wide.current).toBe(false);
//     });
//   });
// });
