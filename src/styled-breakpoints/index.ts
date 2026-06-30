import { createStyledBreakpointsTheme as createTheme } from './create-theme';
import { withValidation } from './validation/with-validation';

export const createStyledBreakpointsTheme = withValidation(createTheme);
