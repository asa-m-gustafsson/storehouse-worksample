import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import StandardLayout from '../components/layout/standard-layout';
import ItemOverview from '../components/item-overview';
import { LocationType } from '../types/enums';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Home: Page = () => {
  const title: string = 'Hemma';
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ItemOverview location={LocationType.Home} />
    </>
  );
};

Home.Layout = StandardLayout;

export default Home;
