import React, { useState, useEffect, ReactNode } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import { NextPage } from 'next';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Home: Page = () => {
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
};

Home.Layout = Layout;

export default Home;
