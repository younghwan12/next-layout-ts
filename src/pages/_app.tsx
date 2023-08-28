import "@/styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import PrimeReact from "primereact/api"
import "../styles/layout/layout.scss"
import "primereact/resources/primereact.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeflex/primeflex.css"

const App = ({ Component, pageProps }: AppProps) => {
  PrimeReact.ripple = true
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
