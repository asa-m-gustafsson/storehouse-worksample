import React from 'react';
import '../styles/item-overview.less';
import ItemListItem from './item-list-item';
import ItemListGroup from './item-list-group';
import {
  ItemList,
  GenericListEntry,
  ListEntryIsItem,
} from '../types/ItemListTypes';
import { LocationType, EventType } from '../types/Enums';

const ItemOverview = ({ location }: { location: LocationType }) => {
  const overviewList: ItemList[] = [
    {
      eventDate: new Date(),
      items: [
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
          name: 'Matbord',
          photo_url: 'https://www.placecage.com/c/800/400',
          itemIds: [3],
        },
        {
          uniqueIdentifier: 'guid',
          name: 'Matsalsstol',
          itemIds: [4, 5, 6, 7],
        },
      ],
    },
    {
      items: [
        { uniqueIdentifier: 'guid', name: 'Snowboard', itemIds: [15] },
        {
          id: 16,
          name: 'Julpynt',
          items: [
            {
              uniqueIdentifier: 'guid',
              name: 'Julgran',
              itemIds: [17],
            },
            { uniqueIdentifier: 'guid', name: 'Julgranspynt', itemIds: [18] },
            {
              uniqueIdentifier: 'guid',
              name: 'Julbelysning (utomhus)',
              itemIds: [19],
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="c-item-overview">
      {overviewList.map((overView) => (
        <div style={{ width: '100%', marginBottom: '8px' }}>
          <div className="c-item-overview__headline">
            <span>
              {overView.eventDate ? 'Hemkörning 20 September' : 'Hemma'}
            </span>
            <span>{`${overView.items.length} saker`}</span>
          </div>
          <div className="c-item-list">
            {overView.items.map((entry) => {
              return ListEntryIsItem(entry) ? (
                <ItemListItem item={entry} />
              ) : (
                <ItemListGroup group={entry} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemOverview;
