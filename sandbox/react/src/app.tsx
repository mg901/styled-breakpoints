import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { up, down, between, only } from '../../..';
import { useBreakpoint } from '../../../react';

const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Block = styled.div`
  width: 10rem;
  height: 10rem;
  background: red;
  margin-left: auto;
  margin-right: auto;
`;

const Mobile = styled(Block)`
  background-color: #d3e2e6;
`;

const Tablet = styled(Block)`
  background-color: #e9dbe7;
`;

const Desktop = styled(Block)`
  background-color: #eedcc8;
`;

const LargeDesktop = styled(Block)`
  background-color: #eacecf;
`;

const Component = styled.div`
  width: 20rem;
  height: 10rem;
  margin-left: auto;
  margin-right: auto;
  background-color: black;
  margin-bottom: 2rem;

  ${up('sm')} {
    background-color: rebeccapurple;
  }

  ${up('md')} {
    background-color: hotpink;
  }

  ${up('lg')} {
    background-color: lightcoral;
  }

  ${up('xl')} {
    background-color: hotpink;
  }
`;

export const App: React.FC = () => {
  const isMobile = useBreakpoint(only('sm'));
  const isTablet = useBreakpoint(only('md'));
  const isDesktop = useBreakpoint(only('lg'));
  const isLargeDesktop = useBreakpoint(up('xl'));

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Component />
        {isMobile && <Mobile />}
        {isTablet && <Tablet />}
        {isDesktop && <Desktop />}
        {isLargeDesktop && <LargeDesktop />}
      </Wrapper>
    </ThemeProvider>
  );
};
