import "@/styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import "../styles/layout/layout.scss"

import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
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
