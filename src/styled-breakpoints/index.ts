import { createStyledBreakpointsTheme as createTheme } from './create-theme';
import { withValidation } from './validation/with-validation';

export type {
  Config,
  Orientation,
  StyledBreakpointsTheme,
  ThemeBreakpoints,
  Values,
} from './create-theme/types';

export const createStyledBreakpointsTheme = withValidation(createTheme);
