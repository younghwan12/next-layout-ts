import "@/styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import "../styles/layout/layout.scss"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Layout</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default App
