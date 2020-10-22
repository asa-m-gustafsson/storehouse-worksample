import React, { useState } from 'react';
import '../styles/item-overview.less';
import ItemListItem from './item-list-item';
import ItemListGroup from './item-list-group';
import {
  ItemListForOverview,
  ListEntryIsItem,
  GetTotalItemAmountForList,
} from '../types/item-types';
import { LocationType } from '../types/enums';

const ItemOverview = ({
  location,
  lists,
}: {
  location: LocationType;
  lists: ItemListForOverview[];
}) => {
  const [expandedGroupId, setExpandedGroupId] = useState(0);
  const dateFormat = new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'long',
  });

  const getHeadLine = (list: ItemListForOverview): string => {
    switch (location) {
      case LocationType.Home:
        return list.plannedTime
          ? `Bokat för upphämtning ${dateFormat.format(list.plannedTime)}`
          : 'Hemma';
      case LocationType.Storage:
        return list.plannedTime
          ? `Hemkörning ${dateFormat.format(list.plannedTime)}`
          : 'Förvaras';
      default:
        return 'Har bör ett fel kastas';
    }
  };

  return (
    <div className="c-item-overview">
      {lists.map((overview, viewIndex) => (
        <div key={viewIndex} className="c-item-overview__subview">
          <div className="c-item-overview__headline">
            <span>{getHeadLine(overview)}</span>
            <span>{`${GetTotalItemAmountForList(overview)} saker`}</span>
          </div>
          <div className="c-item-list">
            {overview.entries.map((entry, entryIndex) => {
              return ListEntryIsItem(entry) ? (
                <ItemListItem key={entryIndex} item={entry} hasGroup={false} />
              ) : (
                <ItemListGroup
                  key={entryIndex}
                  group={entry}
                  expanded={expandedGroupId === entry.groupId}
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

export default ItemOverview;
