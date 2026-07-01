export const INDENT = `  `;

export const toQuoted = (x: readonly string[]) =>
  x.map<`"${string}"`>((k) => `"${k}"`);

export const toQuotedList = (x: readonly string[]) => toQuoted(x).join(', ');

export const formatValue = (val: unknown) => {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (Array.isArray(val)) {
    return `[${val.join(', ')}]`;
  }

  if (typeof val === 'bigint') {
    return `${val}n`;
  }

  if (typeof val === 'object') {
    return Object.prototype.toString.call(val);
  }

  return String(val);
};
