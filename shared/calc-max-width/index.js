/**
 * Calculates the maximum breakpoint width based on the provided minimum width value.
 *
 * The maximum value is calculated as the minimum of the next one less 0.02px
 * to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
 * See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
 * Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
 * See https://bugs.webkit.org/show_bug.cgi?id=178261
 *
 * @param {string} value - The minimum breakpoint width value.
 * @returns {string} - The calculated maximum breakpoint width.
 */
exports.calcMaxWidth = (value) => `${parseInt(value, 10) - 0.02}px`;
