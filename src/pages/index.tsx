import React, { useState, useEffect, ReactNode } from 'react';
import Head from 'next/head';
import '../styles/index.less';
import Layout from '../components/layout/layout';
import { NextPage } from 'next';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Index: Page = () => {
  const [testVar, setTestVar] = useState('');

  useEffect(() => {
    const url = '/api/hello';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(JSON.parse(JSON.stringify(json)));
      });
  }, []);

  const title: string = 'Vinden';

  return (
    <div>
      <div>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>

        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
      </div>
    </div>
  );
};

Index.Layout = Layout;

export default Index;
