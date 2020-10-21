import React, { ReactNode, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackLinkLayout from '../components/layout/backlink-layout';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Group: Page = () => {
  const router = useRouter();
  console.log(router.query);

  const title: string = `Grupp: `;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

Group.Layout = BackLinkLayout;

export default Group;
