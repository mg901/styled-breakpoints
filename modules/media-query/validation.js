import { formatLines, toUnion } from '../formatters.js';

const orientations = ['landscape', 'portrait'];
const expected = toUnion(orientations);

export const withValidation =
  (fn) =>
  (...args) => {
    const value = args[args.length - 1];

    if (!orientations.includes(value)) {
      throw new Error(
        `Invalid orientation.${formatLines(
          `Received: "${value}"`,
          `Expected: ${expected}`
        )}`
      );
    }

    return fn(...args);
  };
