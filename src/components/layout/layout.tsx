import React, { ReactNode } from 'react';
import '../../styles/layout.less';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = (props: { children: ReactNode }) => {
  return (
    <div className="c-layout">
      <div className="c-layout__header c-header">
        <h3>{'Vinden'}</h3>
      </div>
      <div className="c-layout__content">{props.children}</div>
      <div className="c-layout__navbar c-navbar">
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/home">Home!</ActiveLink>
        </div>
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/storage">Storage!</ActiveLink>
        </div>
        <div className="c-navbar__link-wrapper">
          <div className="c-navbar__center-button">
            <div className="c-navbar__button-text">
              <h1>+</h1>
            </div>
          </div>
        </div>
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/">Chat!</ActiveLink>
        </div>
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/">Other!</ActiveLink>
        </div>
      </div>
    </div>
  );
};

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`c-navbar__link ${
          router.pathname === href && 'c-navbar__link--active'
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default Layout;
