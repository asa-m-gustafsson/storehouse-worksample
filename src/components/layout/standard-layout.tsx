import React, { ReactNode } from 'react';
import '../../styles/layout.less';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SvgType, getSvg } from '../../support/get-svg';

const StandardLayout = (props: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className="c-layout c-layout--standard">
      <div className="c-layout__header c-header">
        <h3>{'Vinden'}</h3>
      </div>
      <div className="c-layout__content c-layout__content--standard">
        {props.children}
      </div>
      <div className="c-layout__navbar c-navbar">
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/storage">
            <div className="c-navbar__button">
              {getSvg(SvgType.Storage)}
              <span>Vinden</span>
            </div>
          </ActiveLink>
        </div>

        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/home">
            <div className="c-navbar__button">
              {getSvg(SvgType.Home)}
              <span>Hemma</span>
            </div>
          </ActiveLink>
        </div>
        <div className="c-navbar__link-wrapper">
          <div className="c-navbar__button c-navbar__button--center">
            {getSvg(SvgType.Add)}
          </div>
        </div>
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/chat">
            <div className="c-navbar__button">
              {getSvg(SvgType.Chat)}
              <span>Chatt</span>
            </div>
          </ActiveLink>
        </div>
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/">
            <div className="c-navbar__button">
              {getSvg(SvgType.Other)}
              <span>Övrigt</span>
            </div>
          </ActiveLink>
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

export default StandardLayout;
