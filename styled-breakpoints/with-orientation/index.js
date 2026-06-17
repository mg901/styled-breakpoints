/* istanbul ignore file */
import { withOrientation as prod } from './index.prod.js';
import { withOrientation as dev } from './index.dev.js';

const withOrientation = process.env.NODE_ENV === 'production' ? prod : dev;

export { withOrientation };
