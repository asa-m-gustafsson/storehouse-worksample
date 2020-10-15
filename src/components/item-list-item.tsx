import React from 'react';

const ItemListItem = () => {
  return (
    <div className="c-item-card">
      <div className="c-item-card__left-wrapper">
        <div className="c-item-card__picture">
          <img src="https://www.placecage.com/c/200/300" alt="" />
        </div>
        <span className="c-item-card__item-name">Verktygslåda</span>
      </div>
      <h1>{`>`}</h1>
    </div>
  );
};

export default ItemListItem;
