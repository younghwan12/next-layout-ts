import "@/styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import PrimeReact from "primereact/api"
import "../styles/layout/layout.scss"
import "primereact/resources/primereact.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeflex/primeflex.css"

import { Provider } from "react-redux"
import { persistor, store } from "../redux/store"

const App = ({ Component, pageProps }: AppProps) => {
  PrimeReact.ripple = true
  return (
    <Provider store={store}>
      <Head>
        <title>Layout</title>
        <link href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
export default App
