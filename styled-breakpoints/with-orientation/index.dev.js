const { withOrientation: withOrientationRaw } = require('./index.prod');

exports.withOrientation = ({ mediaQuery, orientation, invariant }) => {
  const isValid = orientation === 'portrait' || orientation === 'landscape';

  invariant(
    isValid,
    `\`${orientation}\` is invalid orientation. Please use \`landscape\` or \`portrait\`.`
  );

  /* istanbul ignore next */
  return withOrientationRaw({
    mediaQuery,
    orientation,
  });
};
