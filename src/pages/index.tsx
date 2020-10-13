import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import '../styles/index.less';

const Index = () => {
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

  return (
    <div>
      <Head>
        <title>Create Next App</title>
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
  );
};

export default Index;
