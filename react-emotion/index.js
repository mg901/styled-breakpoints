const getTheme = require('@emotion/react').useTheme;

const { createUseBreakpoint } = require('../hooks/use-breakpoint');

exports.useBreakpoint = createUseBreakpoint({ theme: getTheme() });
