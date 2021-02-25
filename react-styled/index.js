const { useTheme } = require('styled-components');

const { createUseBreakpoint } = require('../hooks/use-breakpoint');

exports.useBreakpoint = createUseBreakpoint({ theme: useTheme });
