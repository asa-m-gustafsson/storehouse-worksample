import React from 'react';

const ItemList = () => {
  return (
    <div className="c-item-overview__list">
      <div className="c-item-card">
        {/* <div style={{ height: '100%' }}> */}
        <div className="c-item-card__left-wrapper">
          <img
            src="https://www.placecage.com/c/200/300"
            alt=""
            className="c-item-card__picture"
          />
          <span className="c-item-card__item-name">Verktygslåda</span>
        </div>
        {/* </div> */}
        <h1>{`>`}</h1>
      </div>
    </div>
  );
};

export default ItemList;
