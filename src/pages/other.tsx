import React, { ReactNode } from 'react';
import Head from 'next/head';
import '../styles/index.less';
import StandardLayout from '../components/layout/standard-layout';
import { NextPage } from 'next';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Other: Page = () => {
  const title: string = 'Övrigt';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="c-button c-button--full-width">
        <span className="c-button__text">Boka upphämtning</span>
      </div>
      <br />
      <br />
      <div className="c-button c-button--full-width c-button--pink">
        <span className="c-button__text">Boka upphämtning</span>
      </div>
      <br />
      <br />
      <div className="c-button c-button--full-width c-button--teal">
        <span className="c-button__text">Testknapp</span>
      </div>
    </>
  );
};

Other.Layout = StandardLayout;

export default Other;
