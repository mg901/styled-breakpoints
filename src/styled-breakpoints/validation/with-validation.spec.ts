import { withValidation } from './with-validation';

describe('withValidation', () => {
  let upMock: ReturnType<typeof vi.fn>;
  let createThemeMock: any;

  beforeEach(() => {
    upMock = vi.fn();

    createThemeMock = () => ({
      breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        up: upMock,
        down: vi.fn(),
        between: vi.fn(),
        only: vi.fn(),
      },
    });
  });

  describe('theme configuration', () => {
    let createTheme: ReturnType<typeof withValidation>;

    beforeEach(() => {
      createTheme = withValidation(createThemeMock);
    });

    it('throws when breakpoints is an empty object', () => {
      const expected = () => {
        createTheme({
          // @ts-expect-error
          breakpoints: {},
        });
      };

      expect(expected).toThrowErrorMatchingInlineSnapshot(`
        [Error: [styled-breakpoints] › Theme configuration failed:

          Reason: "breakpoints" must be defined.
        ]
      `);
    });

    it('throws then breakpoints is null', () => {
      const expected = () => {
        createTheme({
          // @ts-expect-error
          breakpoints: null,
        });
      };

      expect(expected).toThrowErrorMatchingInlineSnapshot(`
        [Error: [styled-breakpoints] › Theme configuration failed:

          Reason: "breakpoints" must be defined.
        ]
      `);
    });

    it('throws then breakpoint.values in an empty object', () => {
      const expected = () => {
        createTheme({
          breakpoints: {
            values: {},
          },
        });
      };

      expect(expected).toThrowErrorMatchingInlineSnapshot(`
        [Error: [styled-breakpoints] › Theme configuration failed:

          Reason: "breakpoints.values" must be defined.
        ]
      `);
    });

    it('throws when breakpoint.values is null', () => {
      const expected = () => {
        createTheme({
          breakpoints: {
            // @ts-expect-error
            values: null,
          },
        });
      };

      expect(expected).toThrowErrorMatchingInlineSnapshot(`
        [Error: [styled-breakpoints] › Theme configuration failed:

          Reason: "breakpoints.values" must be defined.
        ]
      `);
    });

    it('throws for non-string breakpoint values', () => {
      // Arrange
      const invalidValues = {
        xs: null,
        sm: undefined,
        md: [1],
        lg: BigInt(42),
        xl: new Map([[1, new Set()]]),
        xxl: 42,
      } as any;

      // Act
      const expected = () => {
        createTheme({
          breakpoints: {
            values: invalidValues,
          },
        });
      };

      // Assert
      expect(expected).toThrowErrorMatchingInlineSnapshot(`
        [Error: [styled-breakpoints] › Theme configuration failed:

          Reason: All breakpoint values must be strings

          Example: "0px", "576px", "768px" etc.

          Received:
            - xs: "null"
            - sm: "undefined"
            - md: "[1]"
            - lg: "42n"
            - xl: "[object Map]"
            - xxl: "42"

        ]
      `);
    });

    it('throws for non-px breakpoint values', () => {
      // Arrange
      const invalidValues = {
        xs: '0px',
        sm: 'foopx',
        md: 'wtf',
        lg: '992',
        xl: 'px1200',
      } as any;

      // Act
      const expected = () => {
        createTheme({
          breakpoints: {
            values: invalidValues,
          },
        });
      };

      // Assert
      expect(expected).toThrowErrorMatchingInlineSnapshot(`
        [Error: [styled-breakpoints] › Theme configuration failed:

          Reason: All values must be non-negative integers with a "px" suffix

          Example: "0px", "576px", "768px" etc.

          Received:
            - sm: "foopx"
            - md: "wtf"
            - lg: "992"
            - xl: "px1200"

        ]
      `);
    });

    it('throws for missing initial breakpoint "0px"', () => {
      // Act
      const expected = () => {
        createTheme({
          breakpoints: {
            values: {
              sm: '576px',
              md: '768px',
              lg: '992px',
            },
          },
        });
      };

      expect(expected).toThrowErrorMatchingInlineSnapshot(`
        [Error: [styled-breakpoints] › Theme configuration failed:

          Reason: Missing initial breakpoint "0px"

          Example: "0px", "576px", "768px" etc.

          Received:
            - sm: "576px"
            - md: "768px"
            - lg: "992px"

        ]
      `);
    });

    it('does not throw if the initial breakpoint defined', () => {
      const expected = () => {
        createTheme({
          breakpoints: {
            values: {
              xs: '0px',
            },
          },
        });
      };

      expect(expected).not.toThrow();
    });
  });

  describe('breakpoints input validation', () => {
    let theme: any;

    beforeEach(() => {
      theme = withValidation(createThemeMock)();
    });

    describe('up', () => {
      it('throws for a non-existing breakpoint', () => {
        // Act
        const expected = () => {
          theme.breakpoints.up('foo');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.up() failed:

            - Reason: Breakpoint does not exist.

            - Available: "xs", "sm", "md", "lg", "xl", "xxl"

            - Received: up("foo")
          ]
        `);
      });

      it('throws for an invalid orientation', () => {
        // Act
        const expected = () => {
          theme.breakpoints.up('sm', 'foo');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.up() failed:

            - Reason: Invalid orientation.

            - Expected: "landscape", "portrait"

            - Received: up("sm", "foo")
          ]
        `);
      });
    });

    describe('down', () => {
      it('throws for a non-existing breakpoint', () => {
        // Act
        const expected = () => {
          theme.breakpoints.down('foo');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.down() failed:

            - Reason: Breakpoint does not exist.

            - Available: "xs", "sm", "md", "lg", "xl", "xxl"

            - Received: down("foo")
          ]
        `);
      });

      it('throws for zero upper bound', () => {
        // Act
        const expected = () => {
          theme.breakpoints.down('xs');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.down() failed:

            - Reason: "0px" cannot be used as an upper bound.

            - Expected: "sm", "md", "lg", "xl", "xxl"

            - Received: down("xs")
          ]
        `);
      });

      it('throws for an invalid orientation', () => {
        // Act
        const expected = () => {
          theme.breakpoints.down('sm', 'foo');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.down() failed:

            - Reason: Invalid orientation.

            - Expected: "landscape", "portrait"

            - Received: down("sm", "foo")
          ]
        `);
      });
    });

    describe('between', () => {
      it('throws then less than two arguments', () => {
        // Act
        const expected = () => {
          theme.breakpoints.between('sm');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.between() failed:

            - Reason: Invalid number of arguments.

            - Expected: 2 arguments (min, max)

            - Received: between("sm")
          ]
        `);
      });

      it('throws for the first non-existing breakpoint', () => {
        // Act
        const invalidMin = () => {
          theme.breakpoints.between('foo', 'xl');
        };

        // Assert
        expect(invalidMin).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.between() failed:

            - Reason: First breakpoint does not exist.

            - Available: "xs", "sm", "md", "lg", "xl", "xxl"

            - Received: between("foo", "xl")
          ]
        `);
      });

      it('throws for invalid breakpoint order', () => {
        // Act
        const expected = () => {
          theme.breakpoints.between('xxl', 'xs');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.between() failed:

            - Reason: Min breakpoint must be less than max breakpoint.

            - Received: between("xxl", "xs")
          ]
        `);
      });

      it('throws for the second non-existing breakpoint', () => {
        // Act
        const invalidMin = () => {
          theme.breakpoints.between('sm', 'foo');
        };

        // Assert
        expect(invalidMin).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.between() failed:

            - Reason: Second breakpoint does not exist.

            - Available: "xs", "sm", "md", "lg", "xl", "xxl"

            - Received: between("sm", "foo")
          ]
        `);
      });

      it('throws for an invalid orientation', () => {
        // Act
        const expected = () => {
          theme.breakpoints.between('sm', 'md', 'foo');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.between() failed:

            - Reason: Invalid orientation.

            - Expected: "landscape", "portrait"

            - Received: between("sm", "md", "foo")
          ]
        `);
      });
    });

    describe('only', () => {
      it('throws for a non-existing breakpoint', () => {
        // Act
        const expected = () => {
          theme.breakpoints.only('foo');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.only() failed:

            - Reason: Breakpoint does not exist.

            - Available: "xs", "sm", "md", "lg", "xl", "xxl"

            - Received: only("foo")
          ]
        `);
      });

      it('throws for an invalid orientation', () => {
        // Act
        const expected = () => {
          theme.breakpoints.only('sm', 'foo');
        };

        // Assert
        expect(expected).toThrowErrorMatchingInlineSnapshot(`
          [Error: [styled-breakpoints] › breakpoints.only() failed:

            - Reason: Invalid orientation.

            - Expected: "landscape", "portrait"

            - Received: only("sm", "foo")
          ]
        `);
      });
    });

    describe('memoization', () => {
      it('computes separately for different arguments', () => {
        theme.breakpoints.up('sm');
        theme.breakpoints.up('md');

        expect(upMock).toHaveBeenCalledTimes(2);
      });

      it('does not recompute on repeated call', () => {
        // Arrange
        let callCount = 0;
        const result = 'result-1';

        upMock.mockImplementation(() => {
          callCount += 1;

          return `result-${callCount}`;
        });

        const first = theme.breakpoints.up('md');
        const second = theme.breakpoints.up('md');

        expect(first).toBe(result);
        expect(second).toBe(result);
        expect(upMock).toHaveBeenCalledOnce();
      });
    });
  });
});
