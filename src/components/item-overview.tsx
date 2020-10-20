import React, { useState, useContext } from 'react';
import '../styles/item-overview.less';
import ItemListItem from './item-list-item';
import ItemListGroup from './item-list-group';
import {
  ItemListForOverview,
  ItemListEntry,
  GroupListEntry,
  GenericListEntry,
  ListEntryIsItem,
} from '../types/item-list-types';
import { LocationType, EventType } from '../types/enums';
import { ApiContext } from './fake-api/api-context';
import { ApiStateType } from '../types/api-types';

const ItemOverview = ({ location }: { location: LocationType }) => {
  const { state, dispatch } = useContext(ApiContext);
  const [expandedGroupId, setExpandedGroupId] = useState(0);
  const dateFormat = new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'long',
  });

  const getHeadLine = (list: ItemListForOverview): string => {
    switch (location) {
      case LocationType.Home:
        return list.eventDate
          ? `Bokat för upphämtning ${dateFormat.format(list.eventDate)}`
          : 'Hemma';
      case LocationType.Storage:
        return list.eventDate
          ? `Hemkörning ${dateFormat.format(list.eventDate)}`
          : 'Förvaras';
      default:
        return 'Har bör ett fel kastas';
    }
  };

  console.log(state);

  return (
    <div className="c-item-overview">
      {overviewList.map((overView) => (
        <div style={{ width: '100%', marginBottom: '8px' }}>
          <div className="c-item-overview__headline">
            <span>{getHeadLine(overView)}</span>
            <span>{`${overView.items.length} saker`}</span>
          </div>
          <div className="c-item-list">
            {overView.items.map((entry) => {
              return ListEntryIsItem(entry) ? (
                <ItemListItem item={entry} />
              ) : (
                <ItemListGroup
                  group={entry}
                  expanded={expandedGroupId === entry.id}
                  toggleExpanded={setExpandedGroupId}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const extractItemListFromState = (
  location: LocationType,
  state: ApiStateType
): ItemListForOverview[] => {
  const locatedItems = state.itemEntities.filter(
    (ie) => ie.location === location
  );
  let returnList: ItemListForOverview[] = [];
  // locatedItems.forEach(item=>{
  //   const indexOfEventForItem = returnList.findIndex((event) => event.items.find(i => ))
  // });
  // let formattedItems: ItemListEntry[] = [];
  // locatedItems.forEach((item) => {
  //   const indexOfFormattedItem = formattedItems.findIndex((fi) =>
  //     fi.itemIds.includes(item.id)
  //   );
  //   if (indexOfFormattedItem === -1) {
  //     const itemInfo = state.itemInfos.find((info) => info.id === item.info_id);
  //     formattedItems.push({
  //       name: itemInfo.name,
  //       photo_url: itemInfo.photo_url,
  //       infoId: itemInfo.id,
  //       itemIds: [item.id],
  //     });
  //   }
  // });
  return returnList;
};

const overviewList: ItemListForOverview[] = [
  {
    eventDate: new Date(),
    items: [
      {
        infoId: 0,
        name: 'Verktygslåda',
        photo_url: 'https://www.placecage.com/c/400/800',
        itemIds: [1],
      },
      {
        id: 8,
        name: 'Giraff med Tillbehör',
        items: [
          {
            infoId: 0,
            name: 'Giraff',
            photo_url: 'http://www.placekitten.com/400/800',
            itemIds: [9],
          },
          {
            infoId: 0,
            name: 'Vattenskål',
            photo_url: 'http://www.placekitten.com/900/800',
            itemIds: [10],
          },
          {
            infoId: 0,
            name: 'Giraffstrumpa',
            photo_url: 'https://www.placecage.com/200/100',
            itemIds: [11, 12, 13, 14],
          },
        ],
      },
      {
        infoId: 0,
        name: 'Matbord',
        photo_url: 'https://www.placecage.com/c/800/400',
        itemIds: [3],
      },
      {
        infoId: 0,
        name: 'Matsalsstol',
        itemIds: [4, 5, 6, 7],
      },
    ],
  },
  {
    items: [
      { infoId: 0, name: 'Snowboard', itemIds: [15] },
      {
        id: 16,
        name: 'Julpynt',
        items: [
          {
            infoId: 0,
            name: 'Julgran',
            itemIds: [17, 20],
          },
          { infoId: 0, name: 'Julgranspynt', itemIds: [18] },
          {
            infoId: 0,
            name: 'Julbelysning (utomhus)',
            itemIds: [19],
          },
          { infoId: 0, name: 'Juldukar', itemIds: [21] },
        ],
      },
    ],
  },
];

export default ItemOverview;
