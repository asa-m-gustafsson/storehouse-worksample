import React, { ReactNode } from 'react';
import Head from 'next/head';
import '../styles/index.less';
import StandardLayout from '../components/layout/standard-layout';
import { NextPage } from 'next';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Index: Page = () => {
  const title: string = 'Vinden';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

Index.Layout = StandardLayout;

export default Index;
