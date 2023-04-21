const { createBreakpoints, ERROR_PREFIX } = require('./breakpoints');

const { up, down, between, only } = createBreakpoints();

describe('core/create-breakpoints', () => {
  describe('up', () => {
    it("should throw exception if breakpoint name isn't found", () => {
      expect(() => up('wtf')).toThrow(
        `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw exception if breakpoint is equal to zero', () => {
      expect(() => up('xs')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });

    it('should render correctly breakpoints by default', () => {
      const mockBreakpoints = new Map([
        ['sm', '576px'],
        ['md', '768px'],
        ['lg', '992px'],
        ['xl', '1200px'],
        ['xxl', '1400px'],
      ]);

      mockBreakpoints.forEach((value, key) => {
        expect(up(key)).toEqual(value);
      });
    });
  });

  describe('down', () => {
    it("should throw exception if breakpoint name isn't found", () => {
      expect(() => down('wtf')).toThrow(
        `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should render correctly breakpoints by default', () => {
      const mockBreakpoints = new Map([
        ['sm', '575.98px'],
        ['md', '767.98px'],
        ['lg', '991.98px'],
        ['xl', '1199.98px'],
        ['xxl', '1399.98px'],
      ]);

      mockBreakpoints.forEach((value, key) => {
        expect(down(key)).toEqual(value);
      });
    });
  });

  describe('between', () => {
    it("should throw exception if breakpoint name isn't found", () => {
      expect(() => between('wtf', 'md')).toThrow(
        `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw exception if breakpoint is equal to zero ', () => {
      expect(() => between('xs', 'sm')).toThrow(
        `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
      );
    });

    it('should return correct values', () => {
      const mockBreakpoints = new Map([
        [['sm', 'md'], { min: '576px', max: '767.98px' }],
        [['md', 'lg'], { min: '768px', max: '991.98px' }],
        [['lg', 'xl'], { min: '992px', max: '1199.98px' }],
        [['xl', 'xxl'], { min: '1200px', max: '1399.98px' }],
        [['sm', 'lg'], { min: '576px', max: '991.98px' }],
        [['md', 'xl'], { min: '768px', max: '1199.98px' }],
        [['lg', 'xxl'], { min: '992px', max: '1399.98px' }],
      ]);

      mockBreakpoints.forEach((value, [min, max]) => {
        expect(between(min, max)).toEqual(value);
      });
    });
  });

  describe('only', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      expect(() => only('wtf')).toThrow(
        `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
      );
    });

    it('should throw exception if the last breakpoint is specified as the maximum value', () => {
      expect(() => only('xxl')).toThrow(
        `${ERROR_PREFIX}\`xxl\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
      );
    });

    it('should return correct values', () => {
      const mockBreakpoints = new Map([
        ['sm', { min: '576px', max: '767.98px' }],
        ['md', { min: '768px', max: '991.98px' }],
        ['lg', { min: '992px', max: '1199.98px' }],
        ['xl', { min: '1200px', max: '1399.98px' }],
      ]);

      mockBreakpoints.forEach((value, key) => {
        expect(only(key)).toEqual(value);
      });
    });
  });
});
