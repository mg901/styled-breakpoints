import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';

export const useBreakpoint = (breakpoint: Function): boolean => {
  const query = breakpoint({
    theme: useTheme(),
  }).replace(/^@media/, '');

  const mq = window.matchMedia(query);
  const [isBreak, setIsBreak] = useState(mq.matches);

  useEffect(() => {
    const handleResize = () => {
      setIsBreak(window.matchMedia(query).matches);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [query]);

  return isBreak;
};
