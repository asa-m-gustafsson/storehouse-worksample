import React, { useState, useEffect, ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import ItemOverview from '../components/item-overview';

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
      <ItemOverview />
    </>
  );
};

Home.Layout = Layout;

export default Home;
