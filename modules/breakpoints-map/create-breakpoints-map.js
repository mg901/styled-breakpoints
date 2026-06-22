export const createBreakpointMap = (breakpoints) => {
  const sorted = Object.entries(Object(breakpoints))
    .map(([key, val]) => [key, parseInt(val, 10)])
    .sort(([, a], [, b]) => a - b);

  const entries = sorted.map(([key, value], i, arr) => {
    const next = arr[i + 1];
    const nextVal = next && next[1];

    return [
      key,
      {
        min: `${value}px`,
        max: value === 0 ? null : `${value - 0.02}px`,
        end: nextVal ? `${nextVal - 0.02}px` : null,
      },
    ];
  });

  return Object.fromEntries(entries);
};
