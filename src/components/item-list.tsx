import React from 'react';
import ItemListItem from './item-list-item';
import ItemListGroup from './item-list-group';
import {
  ItemListEntry,
  GroupListEntry,
  GenericListEntry,
  ListEntryIsItem,
} from '../types/ItemOverviewTypes';

const ItemList = ({ entryList }: { entryList: GenericListEntry[] }) => {
  return (
    <div className="c-item-list">
      {entryList.map((entry) => {
        return ListEntryIsItem(entry) ? (
          <ItemListItem item={entry} />
        ) : (
          <ItemListGroup group={entry} />
        );
      })}
    </div>
  );
};

export default ItemList;
