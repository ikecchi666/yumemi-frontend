import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '@/theme/theme'

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
}
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}
header {
  height: 90px;
  width: 100%;
  margin:auto;
  display: flex;
  justify-content: center;
  padding-top: 32px;
  color: white;
  background-color: black;
}
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>総人口推移</title>
        <meta name="description" content="都道府県別の総人口推移" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
