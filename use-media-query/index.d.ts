export function useMediaQuery(
  query: string,
  options?: {
    getServerSnapshot?: () => boolean;
  }
): boolean;
