import React, { useState, useRef, useEffect, useReducer } from 'react';
import '../styles/overlay-menu.less';

const OverlayMenu = ({
  show,
  middlePointX,
  middlePointY,
  maxWidth,
  handleClose,
  children,
}: {
  show: boolean;
  middlePointX: number;
  middlePointY: number;
  maxWidth: number;
  handleClose: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <div
        className="c-overlay-menu"
        style={{ display: show ? 'block' : 'none' }}
      >
        <div
          className="c-overlay-menu__backdrop"
          onClick={() => {
            handleClose();
          }}
        >
          <div
            className="c-overlay-menu__content-wrapper"
            style={{
              maxWidth: `${maxWidth}px`,
              left: `${middlePointX}px`,
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
