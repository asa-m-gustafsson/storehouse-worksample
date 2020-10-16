import React from 'react';
import { ItemListEntry } from '../types/ItemOverviewTypes';

const ItemListItem = ({ item }: { item: ItemListEntry }) => {
  return (
    <div className="c-item-card">
      <div className="c-item-card__left-wrapper">
        <div className="c-item-card__picture">
          <img
            src={item.photo_url ?? 'https://www.placecage.com/c/200/300'}
            alt={item.name}
          />
        </div>
        <span className="c-item-card__item-text">{item.name}&nbsp;</span>
        <span className="c-item-card__item-text c-item-card__item-text--details">
          {item.itemIds.length > 1 ? ` (${item.itemIds.length} st)` : ''}
        </span>
      </div>
      <h1>{`>`}</h1>
    </div>
  );
};

export default ItemListItem;
