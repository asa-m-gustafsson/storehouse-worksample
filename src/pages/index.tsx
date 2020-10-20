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
      </div>
    </div>
  );
};

Index.Layout = Layout;

export default Index;
