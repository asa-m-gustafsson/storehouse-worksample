import React, { useState, useEffect, ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/layout';

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
      <h1>STORAGE</h1>
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
    </>
  );
};

Storage.Layout = Layout;

export default Storage;
