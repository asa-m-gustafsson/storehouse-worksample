import React from 'react';
import ItemListItem from './item-list-item';
import ItemListGroup from './item-list-group';
import {
  ItemListEntry,
  GroupListEntry,
  GenericListEntry,
  ListEntryIsItem,
} from '../types/ItemOverviewTypes';

const ItemList = () => {
  const entryArray: GenericListEntry[] = [
    {
      uniqueIdentifier: 'guid',
      name: 'Verktygslåda',
      photo_url: 'https://www.placecage.com/c/400/800',
      itemIds: [1],
    },
    {
      id: 8,
      name: 'Giraff med Tillbehör',
      items: [
        {
          uniqueIdentifier: 'guid',
          name: 'Giraff',
          photo_url: 'http://www.placekitten.com/400/800',
          itemIds: [9],
        },
        {
          uniqueIdentifier: 'guid',
          name: 'Vattenskål',
          photo_url: 'http://www.placekitten.com/900/800',
          itemIds: [10],
        },
        {
          uniqueIdentifier: 'guid',
          name: 'Giraffstrumpa',
          photo_url: 'https://www.placecage.com/200/100',
          itemIds: [11, 12, 13, 14],
        },
      ],
    },
    {
      uniqueIdentifier: 'guid',
      name: 'Julpynt',
      photo_url: 'https://www.placecage.com/c/200/200',
      itemIds: [2],
    },
    {
      uniqueIdentifier: 'guid',
      name: 'Matbord',
      photo_url: 'https://www.placecage.com/c/800/400',
      itemIds: [3],
    },
    {
      uniqueIdentifier: 'guid',
      name: 'Matsalsstol',
      itemIds: [4, 5, 6, 7],
    },
  ];

  return (
    <div className="c-item-overview__list">
      {entryArray.map((entry) => {
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
