// @flow

export const withMinMedia = (minWidth: any): string =>
  `@media (min-width: ${minWidth})`;

export const withMaxMedia = (maxWidth: any): string =>
  `@media (max-width: ${maxWidth})`;

export const withMinAndMaxMedia = (minWidth: any, maxWidth: any): string =>
  `@media (min-width: ${minWidth}) and (max-width: ${maxWidth})`;
