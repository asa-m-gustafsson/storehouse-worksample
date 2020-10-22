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

const Storage: Page = () => {
  const title: string = 'Vinden';
  const itemLists = getItemLists(LocationType.Storage);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ItemOverview location={LocationType.Storage} lists={itemLists} />
    </>
  );
};

Storage.Layout = StandardLayout;

export default Storage;
