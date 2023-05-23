const { withOrientation } = require('./with-orientation.prod');

exports.withOrientation = ({ mediaQuery, orientation, invariant }) => {
  invariant(
    orientation === 'portrait' || orientation === 'landscape',
    `\`${orientation}\` is invalid orientation. Use \`landscape\` or \`portrait\`.`
  );

  return withOrientation({
    mediaQuery,
    orientation,
  });
};
