import '../styles/globals.less';
import React from 'react';
import { ApiProvider } from '../support/fake-api/api-context';

function MyApp({ Component, pageProps }) {
  const CurrentLayout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <ApiProvider>
      <CurrentLayout>
        <Component {...pageProps} />
      </CurrentLayout>
    </ApiProvider>
  );
}

export default MyApp;
