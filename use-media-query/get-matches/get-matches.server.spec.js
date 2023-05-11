const { getMatches } = require('./get-matches');

describe('getMatches function on server', () => {
  it('should return false as there is no window object on the server', () => {
    expect(getMatches('(min-width: 768px)')).toBe(false);
  });
});
