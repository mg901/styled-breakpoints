const get = (o, path, defaultValue) => {
  const [head, ...tail] =
    typeof path === 'string'
      ? path.replace(/\[(\d+)]/g, '.$1').split('.')
      : path;

  if (!o[head]) return defaultValue;

  return !tail.length ? o[head] : get(o[head], tail, defaultValue);
};

const withMinAndMaxMedia = (x, y) =>
  `@media (min-width: ${x}) and (max-width: ${y})`;

const makeErrorMessage = (breakName, breaks) =>
  `'${breakName}' is invalid breakpoint name. Use '${Object.keys(breaks).join(
    ', '
  )}'.`;

module.exports = {
  get,
  withMinAndMaxMedia,
  makeErrorMessage,
};
