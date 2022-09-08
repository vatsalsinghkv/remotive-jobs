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
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="120x120" href="job-search.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="job-search.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="job-search.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
