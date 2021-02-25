const { useTheme } = require('@emotion/react');

const { createUseBreakpoint } = require('../hooks/use-breakpoint');

exports.useBreakpoint = createUseBreakpoint({ theme: useTheme });
