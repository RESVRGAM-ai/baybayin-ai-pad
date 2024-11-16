import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>B(ai)bayin | Pagsasalin sa Baybayin - Baybayin AI Writing Pad (beta) :: RESVRGAM.ai :: London, UK 2024</title>
        <meta
          name="description"
          content="The first AI-aided development and AI-powered Baybayin Translation and Transliteration web app build on Next.js framework using Anthropic AI Claude 3.5 Sonnet and Cursor AI. Still on Beta version. More future enhancements and features will be introduced, stay tuned. Designed by John NL Leyson and build by RESVRGAM.ai in London, UK. In partnership with LRN Filipino, London, UK and Baybayin Buhayin, Manila, PH."
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}