import React, { ReactNode } from 'react';
import Head from 'next/head';
import '../styles/index.less';
import StandardLayout from '../components/layout/standard-layout';
import { NextPage } from 'next';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Chat: Page = () => {
  const title: string = 'Chatt';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p style={{ margin: '16px' }}>Ingen vill prata med dig.</p>
    </>
  );
};

Chat.Layout = StandardLayout;

export default Chat;
