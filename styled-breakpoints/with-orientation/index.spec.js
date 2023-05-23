describe('withOrientation function in production', () => {
  let withOrientation = null;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'production';

    withOrientation = require('.').withOrientation;
  });

  it('should return a media query with orientation for landscape', () => {
    const mediaQuery = '(min-width: 768px)';
    const orientation = 'landscape';

    const result = withOrientation({
      mediaQuery,
      orientation,
    });
    expect(result).toBe(`${mediaQuery} and (orientation: ${orientation})`);
  });

  it('should return a media query with orientation for portrait', () => {
    const mediaQuery = '(min-width: 768px)';
    const orientation = 'portrait';

    const result = withOrientation({
      mediaQuery,
      orientation,
    });
    expect(result).toBe(`${mediaQuery} and (orientation: ${orientation})`);
  });
});

describe('with orientation function in development', () => {
  let withOrientation = null;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';

    withOrientation = require('.').withOrientation;
  });

  it('should throw an error when an invalid orientation is provided', () => {
    const mediaQuery = '(min-width: 768px)';
    const orientation = 'invalid';

    const invariant = (condition, message) => {
      if (!condition) throw new Error(message);
    };

    expect(() =>
      withOrientation({
        mediaQuery,
        orientation,
        invariant,
      })
    ).toThrowError(
      `\`${orientation}\` is invalid orientation. Use \`landscape\` or \`portrait\``
    );
  });
});
