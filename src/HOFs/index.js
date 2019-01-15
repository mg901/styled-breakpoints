// @flow

export const withMinMedia = (minWidth: string) =>
  `@media (min-width: ${minWidth})`;

export const withMaxMedia = (maxWidth: string) =>
  `@media (max-width: ${maxWidth})`;

export const widthMinAndMaxMedia = (minWidth: string, maxWidth: string) =>
  `@media (min-width: ${minWidth}) and (max-width: ${maxWidth})`;
