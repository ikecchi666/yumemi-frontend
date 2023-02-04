import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
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
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
