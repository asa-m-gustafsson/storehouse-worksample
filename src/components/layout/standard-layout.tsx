import React, { ReactNode } from 'react';
import '../../styles/layout.less';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-cloud-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                />
              </svg>
              <span>Vinden</span>
            </div>
          </ActiveLink>
        </div>

        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/home">
            <div className="c-navbar__button">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-house-door-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z" />
                <path
                  fill-rule="evenodd"
                  d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                />
              </svg>
              <span>Hemma</span>
            </div>
          </ActiveLink>
        </div>
        <div className="c-navbar__link-wrapper">
          <div className="c-navbar__button c-navbar__button--center">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-plus"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </div>
        </div>
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/chat">
            <div className="c-navbar__button">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-chat-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
              </svg>
              <span>Chatt</span>
            </div>
          </ActiveLink>
        </div>
        <div className="c-navbar__link-wrapper">
          <ActiveLink href="/">
            <div className="c-navbar__button">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-three-dots"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                />
              </svg>
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
