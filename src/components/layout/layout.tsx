import React from 'react';
import Header from './header';
import NavBar from './navbar';
import '../../styles/layout.less';

const Layout = (props) => {
  return (
    <div className="layout">
      <Header title="" />
      <div className="layout__content">{props.children}</div>
      <NavBar />
    </div>
  );
};

export default Layout;
