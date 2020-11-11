const type = (x) => Object.prototype.toString.call(x).slice(8, -1);

const get = (path, obj, defaultValue) => {
  const head = path[0];
  const tail = path.slice(1);

  if (!tail.length) {
    const res = obj[head];
    const isEmpty =
      (type(res) === 'Object' && Object.keys(res).length === 0) ||
      type(res) === 'Null' ||
      type(res) === 'Undefined';

    return isEmpty ? defaultValue : obj[head];
  }

  return get(tail, obj[head], defaultValue);
};

const withMinAndMaxMedia = (x, y) =>
  `@media (min-width: ${x}) and (max-width: ${y})`;

const makeErrorMessage = (breakName, breaks) =>
  `'${breakName}' is invalid breakpoint name. Use '${Object.keys(breaks).join(
    ', '
  )}'.`;

module.exports = {
  type,
  get,
  withMinAndMaxMedia,
  makeErrorMessage,
};
