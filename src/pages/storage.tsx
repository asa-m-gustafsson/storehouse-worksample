import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import ItemOverview from '../components/item-overview';
import { LocationType } from '../types/enums';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Storage: Page = () => {
  const title: string = 'Vinden';
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ItemOverview location={LocationType.Storage} />
    </>
  );
};

Storage.Layout = Layout;

export default Storage;
