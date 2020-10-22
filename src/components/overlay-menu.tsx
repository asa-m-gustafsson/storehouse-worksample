import React, { useState } from 'react';
import useWindowSize from '../support/hooks/use-window-size';
import '../styles/overlay-menu.less';

const OverlayMenu = ({
  show,
  middlePointX,
  middlePointY,
  handleClose,
  children,
}: {
  show: boolean;
  middlePointX: number;
  middlePointY: number;
  handleClose: () => void;
  children?: React.ReactNode;
}) => {
  const size = useWindowSize();

  const contentWidth = 200;
  const sanitizedXPoint =
    Math.min(
      size.width - contentWidth / 2, // largest allowed middlePointX
      Math.max(contentWidth / 2, middlePointX) // smallest allowed middlePointX
    ) -
    contentWidth / 2; // subtract half content-width so that middle is in actual middle

  return (
    <>
      <div
        className="c-overlay-menu"
        style={{ display: show ? 'block' : 'none' }}
      >
        <div
          className="c-overlay-menu__backdrop"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <div
            className="c-overlay-menu__content-wrapper"
            style={{
              width: `${contentWidth}px`,
              left: `${sanitizedXPoint}px`,
              top: `${middlePointY}px`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayMenu;
