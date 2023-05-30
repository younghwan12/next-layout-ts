import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Layout</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
};
export default App;
