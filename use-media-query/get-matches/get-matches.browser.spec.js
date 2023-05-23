/**
 * @jest-environment jsdom
 */

const { mockViewport } = require('jsdom-testing-mocks');
const { getMatches } = require('./get-matches');

describe('getMatch function in browser', () => {
  it('should return true if screen width is equal to 768px', () => {
    const viewport = mockViewport({ width: '768px' });

    expect(getMatches('(min-width: 768px)')).toBe(true);

    viewport.cleanup();
  });

  it('should return false if screen width is less than 768px', () => {
    const viewport = mockViewport({ width: '500px' });

    expect(getMatches('(min-width: 768px)')).toBe(false);

    viewport.cleanup();
  });
});
