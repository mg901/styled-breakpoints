export const buildMediaQuery = (min, max, orientation) => {
  const parts = [];

  if (min) parts.push(`(width >= ${min})`);
  if (max) parts.push(`(width <= ${max})`);
  if (orientation) parts.push(`(orientation: ${orientation})`);

  return `@media ${parts.join(' and ')}`;
};
