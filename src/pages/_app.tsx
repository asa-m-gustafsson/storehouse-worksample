import '../styles/globals.less';
import React from 'react';
import App, { AppProps } from 'next/app';
// import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  const CurrentLayout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <CurrentLayout>
      <Component {...pageProps} />
    </CurrentLayout>
  );
}

export default MyApp;
