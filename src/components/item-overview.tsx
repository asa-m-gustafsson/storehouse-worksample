import React from 'react';
import '../styles/item-overview.less';
import ItemList from './item-list';

const ItemOverview = () => {
  return (
    <div className="c-item-overview">
      <div className="c-item-overview__headline">
        <span>Hemkörning 20 september</span>
        <span>2 saker</span>
      </div>
      <ItemList />
    </div>
  );
};

export default ItemOverview;
