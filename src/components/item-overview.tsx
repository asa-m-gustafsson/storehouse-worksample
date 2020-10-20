import React, { useState, useContext, useEffect } from 'react';
import '../styles/item-overview.less';
import ItemListItem from './item-list-item';
import ItemListGroup from './item-list-group';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
  GetTotalItemAmountForGroup,
  GetTotalItemAmountForList,
} from '../types/item-types';
import { LocationType, EventType } from '../types/enums';
import { ApiContext } from '../support/fake-api/api-context';
import { ApiStateType } from '../types/api-types';
import { extractItemListsFromState } from '../support/fake-api/api-converters';

const ItemOverview = ({ location }: { location: LocationType }) => {
  const { state, dispatch } = useContext(ApiContext);
  const [expandedGroupId, setExpandedGroupId] = useState(0);
  const [overviewList, setOverviewList] = useState<ItemListForOverview[]>([]);
  const dateFormat = new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    setOverviewList(extractItemListsFromState(location, state));
  }, [state]);

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
      {overviewList.map((overview, viewIndex) => (
        <div key={viewIndex} className="c-item-overview__subview">
          <div className="c-item-overview__headline">
            <span>{getHeadLine(overview)}</span>
            <span>{`${GetTotalItemAmountForList(overview)} saker`}</span>
          </div>
          <div className="c-item-list">
            {overview.entries.map((entry, entryIndex) => {
              return ListEntryIsItem(entry) ? (
                <ItemListItem key={entryIndex} item={entry} />
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
