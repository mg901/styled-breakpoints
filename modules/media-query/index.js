import { buildMediaQuery as fn } from './build-media-query.js';
import { withValidation } from './validation.js';
import { isProd } from '../constants.js';

export const buildMediaQuery = isProd ? fn : withValidation(fn);
