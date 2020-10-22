import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import StandardLayout from '../components/layout/standard-layout';
import ItemOverview from '../components/item-overview';
import { LocationType } from '../types/enums';
import getItemLists from '../support/hooks/get-item-lists';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Home: Page = () => {
  const title: string = 'Hemma';
  const itemLists = getItemLists(LocationType.Home);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ItemOverview location={LocationType.Home} lists={itemLists} />
    </>
  );
};

Home.Layout = StandardLayout;

export default Home;
