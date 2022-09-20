import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/globalstyles';

const theme: DefaultTheme = {
  colors: {
    pure: '#fff',
    primary: '#E3E3E3',
    secondary: '#0070f3',
    surface: '#2C2C2C',
    popper: '#404040',
    inputs: '#222222',
    inputsActive: '#1a1a1a',
    placeholders: '#9F9F9F',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
