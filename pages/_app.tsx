import '../styles/globals.css'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
