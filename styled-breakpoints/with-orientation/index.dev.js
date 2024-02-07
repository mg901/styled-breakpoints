const { withOrientation: withOrientationRaw } = require('./index.prod');

exports.withOrientation = ({ mediaQuery, orientation, invariant }) => {
  const isValid = orientation === 'portrait' || orientation === 'landscape';

  invariant(
    isValid,
    `\`${orientation}\` is invalid orientation. Please use \`landscape\` or \`portrait\`.`
  );

  return withOrientationRaw({
    mediaQuery,
    orientation,
  });
};
