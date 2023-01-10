import { Html, Head, Main, NextScript } from 'next/document';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ThemeProvider theme={theme}>
          <Main />
          <NextScript />
          <CssBaseline />
        </ThemeProvider>
      </body>
    </Html>
  );
}
