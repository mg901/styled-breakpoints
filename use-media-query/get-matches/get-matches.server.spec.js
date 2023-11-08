const { getMatches } = require('./get-matches');

describe('getMatches', () => {
  describe('on server', () => {
    it('should return false as there is no window object on the server', () => {
      // And & Assert
      expect(getMatches('(min-width: 768px)')).toBe(false);
    });
  });
});
