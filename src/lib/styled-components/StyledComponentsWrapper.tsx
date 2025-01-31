'use client';

import MobileLayout from '@/components/layout/mobile-layout';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import ReactQueryProvider from '../react-query/ReactQueryProvider';
import LoginSDK from '@/components/LoginSDK';

export default function StyledComponentsWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryProvider>
        <GlobalStyle />
        <LoginSDK />
        <MobileLayout>{children}</MobileLayout>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
