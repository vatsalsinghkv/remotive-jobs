import Head from 'next/head';
import Layout from '../components/UI/Layout';
import { wrapper } from '../store';
import '../styles/globals.scss';

/*
 * NextJs merges multiple Head (including heads from different pages) contents
 * Head data will be overwritten by the page's head content
 */

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
