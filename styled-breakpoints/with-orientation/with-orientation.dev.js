const {
  withOrientation: withOrientationRaw,
} = require('./with-orientation.prod');

exports.withOrientation = ({ mediaQuery, orientation, invariant }) => {
  invariant(
    orientation === 'portrait' || orientation === 'landscape',
    `\`${orientation}\` is invalid orientation. Please use \`landscape\` or \`portrait\`.`
  );

  return withOrientationRaw({
    mediaQuery,
    orientation,
  });
};
