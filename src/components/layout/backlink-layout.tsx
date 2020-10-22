import React, { ReactNode } from 'react';
import '../../styles/layout.less';
import { useRouter } from 'next/router';
import { SvgType, getSvg } from '../../support/get-svg';

const BackLinkLayout = (props: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className="c-layout c-layout--back-link">
      <div
        className="c-layout__back-arrow-wrapper"
        onClick={() => router.back()}
      >
        {getSvg(SvgType.BackLink)}
      </div>
      <div className="c-layout__content c-layout__content--back-link">
        {props.children}
      </div>
    </div>
  );
};

export default BackLinkLayout;
