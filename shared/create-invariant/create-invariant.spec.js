import { describe, beforeEach, it, expect } from 'vitest';
import {
  createInvariant,
  DEFAULT_PREFIX,
  DEFAULT_MESSAGE,
} from './create-invariant';

describe('createInvariant function', () => {
  let invariant = null;

  // Arrange
  beforeEach(() => {
    invariant = createInvariant();
  });

  it('throws an error with the default error prefix if the condition is false', () => {
    // Act
    const received = () => invariant(false);

    // Assert
    expect(received).toThrow(`${DEFAULT_PREFIX}${DEFAULT_MESSAGE}`);
  });

  it('throws an error with the specified error prefix if the condition is false', () => {
    // Arrange
    const CUSTOM_PREFIX = 'Custom prefix: ';
    const invariantWithCustomPrefix = createInvariant(CUSTOM_PREFIX);

    // Act
    const received = () => invariantWithCustomPrefix(false);

    // Assert
    expect(received).toThrow(`${CUSTOM_PREFIX}${DEFAULT_MESSAGE}`);
  });

  it.each([1, -1, true, {}, [], 'hi'])(
    'does not throw if the condition is truthy (%p)',
    (value) => {
      // Act and Assert
      expect(() => invariant(value)).not.toThrow();
    }
  );

  it.each([undefined, null, false, +0, -0, NaN, ''])(
    'throws if the condition is falsy',
    (value) => {
      // Act & Assert
      expect(() => invariant(value)).toThrow();
    }
  );
});
