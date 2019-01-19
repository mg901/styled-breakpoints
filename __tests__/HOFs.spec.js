import { withMinMedia, withMaxMedia, withMinAndMaxMedia } from '../src/HOFs';

describe('HOFs', () => {
  describe('withMinMedia', () => {
    it('should return string containing the breakpoint value  with media query', () => {
      expect(withMinMedia('40em')).toEqual('@media (min-width: 40em)');
    });
  });

  describe('withMaxMedia', () => {
    it('should return string containing the breakpoint value  with media query', () => {
      expect(withMaxMedia('40em')).toEqual('@media (max-width: 40em)');
    });
  });

  describe('withMinAndMaxMedia', () => {
    it('should return string containing the breakpoint value  with media query', () => {
      expect(withMinAndMaxMedia('40em', '60em')).toEqual(
        '@media (min-width: 40em) and (max-width: 60em)',
      );
    });
  });
});
