export const INDENT = `  `;

export const toUnion = (x) => x.map((k) => `"${k}"`).join(' | ');

export const formatLines = (...lines) =>
  `\n\n${lines.map((line) => `${INDENT}${line}`).join('\n')}`;

export const formatValue = (val) => {
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
