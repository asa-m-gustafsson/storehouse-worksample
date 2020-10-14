import React, { useState, useEffect, ReactNode } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import { NextPage } from 'next';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Storage: Page = () => {
  return (
    <div>
      <h1>STORAGE</h1>
    </div>
  );
};

Storage.Layout = Layout;

export default Storage;
