const getTheme = require('styled-components').useTheme;

const { createUseBreakpoint } = require('../hooks/use-breakpoint');

exports.useBreakpoint = createUseBreakpoint({ theme: getTheme() });
