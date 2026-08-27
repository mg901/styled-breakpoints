export const buildMediaQuery = (
  min: string | null,
  max: string | null,
  orientation?: 'landscape' | 'portrait'
) => {
  const parts = [];

  if (min) parts.push(`(width >= ${min})`);
  if (max) parts.push(`(width <= ${max})`);
  if (orientation) parts.push(`(orientation: ${orientation})`);

  return `@media ${parts.join(' and ')}`;
};
