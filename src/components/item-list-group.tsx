import React, { useState, useRef, useEffect } from 'react';
import { ItemListEntry, GroupListEntry } from '../types/ItemOverviewTypes';
import ItemListItem from './item-list-item';

const ItemListGroup = ({ group }: { group: GroupListEntry }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const cardRef = useRef(null);

  if (!group.items.length) {
    return null;
  }

  return (
    <div className="c-item-group">
      <div
        className="c-item-card c-item-card--group"
        onClick={() => setExpanded(!expanded)}
        ref={cardRef}
      >
        <div className="c-item-card__left-wrapper">
          <div className="c-item-card__picture">
            <img
              src={group.photo_url ?? 'https://www.placecage.com/c/200/300'}
              alt={group.name}
            />
          </div>
          <span className="c-item-card__item-text">{group.name}&nbsp;</span>
          <span className="c-item-card__item-text c-item-card__item-text--details">
            {` - Grupp (${group.items.length} kollin)`}
          </span>
        </div>
        <h1>{`>`}</h1>
      </div>
      <div
        className={`c-item-group__list${
          expanded ? ' c-item-group__list--expanded' : ''
        }`}
        style={
          expanded
            ? {
                height: `${
                  (cardRef?.current?.offsetHeight ?? 0) * group.items.length
                }px`,
              }
            : { height: 0 }
        }
      >
        {group.items.map((item) => (
          <ItemListItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemListGroup;
