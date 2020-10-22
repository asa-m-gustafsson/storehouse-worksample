import {
  ItemInfo,
  ItemGroup,
  Dimensions,
  ItemEntity,
  TransportEvent,
} from '../../types/raw-data-types';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
} from '../../types/item-types';
import { ApiStateType } from '../../types/api-types';
import { LocationType, EventType } from '../../types/enums';

// NOTE: There is A LOT of copy-pasted code here. In the future, break out into functions!

export const extractItemListsFromState = (
  location: LocationType,
  state: ApiStateType
): ItemListForOverview[] => {
  // empty list to collect all overviewList
  console.log('extract item lists from state');
  let returnList: ItemListForOverview[] = [];

  // all raw item entities in specified location.
  let locatedRawItems = state.itemEntities.filter(
    (ie) => ie.location === location
  );

  if (!locatedRawItems) {
    return returnList;
  }

  // all upcoming events for location.
  const locatedRawEvents = state.events.filter((event) => {
    return (
      event.type ===
        (location === LocationType.Home
          ? EventType.Storage
          : EventType.Retrieval) &&
      event.plannedTime > new Date() &&
      event.item_ids.length
    );
  });

  locatedRawEvents.forEach((event) => {
    let entriesForEvent: GenericListType[] = [];
    let rawItemsForEvent: ItemEntity[] = [];
    // locate all items belonging to event, move them from list of all items in location to sub-list...
    event.item_ids.forEach((id) => {
      rawItemsForEvent.push(
        ...locatedRawItems.splice(
          locatedRawItems.findIndex((ri) => ri.id === id),
          1
        )
      );
    });
    // ... and for each item in sub-list, format group/item-types or add to existing ones.
    rawItemsForEvent.forEach((rawItem) => {
      if (rawItem.group_id) {
        // item belongs in a group. Find group and add item to it, or create new group with item.
        let groupEntryForRawItem: GroupType = entriesForEvent.find((entry) => {
          return !ListEntryIsItem(entry) && entry.groupId === rawItem.group_id;
        }) as GroupType;
        if (groupEntryForRawItem) {
          let itemEntryInGroupForRawItem = groupEntryForRawItem.items.find(
            (item) => {
              return item.infoId === rawItem.info_id;
            }
          );
          if (itemEntryInGroupForRawItem) {
            itemEntryInGroupForRawItem.itemIds.push(rawItem.id);
          } else {
            const infoForRawItem = state.itemInfos.find(
              (info) => info.id === rawItem.info_id
            );
            groupEntryForRawItem.items.push({
              infoId: infoForRawItem.id,
              name: infoForRawItem.name,
              description: infoForRawItem.description,
              photo_url: infoForRawItem.photo_url,
              dimensions: infoForRawItem.dimensions,
              location: rawItem.location,
              itemIds: [rawItem.id],
            });
          }
        } else {
          //group doesn't exist. Create new group and create item inside this group.
          const infoForRawItem = state.itemInfos.find(
            (info) => info.id === rawItem.info_id
          );
          const groupInfoForRawItem = state.itemGroups.find(
            (group) => group.id === rawItem.group_id
          );
          entriesForEvent.push({
            groupId: groupInfoForRawItem.id,
            name: groupInfoForRawItem.name,
            description: groupInfoForRawItem.description,
            photo_url: groupInfoForRawItem.photo_url,
            items: [
              {
                infoId: infoForRawItem.id,
                name: infoForRawItem.name,
                description: infoForRawItem.description,
                photo_url: infoForRawItem.photo_url,
                dimensions: infoForRawItem.dimensions,
                location: rawItem.location,
                itemIds: [rawItem.id],
              },
            ],
          });
        }
      } else {
        // item does not belong in a group. Add to existing item entry or create new.
        let itemEntryForRawItem: ItemType = entriesForEvent.find((entry) => {
          return ListEntryIsItem(entry) && entry.infoId === rawItem.info_id;
        }) as ItemType;
        if (itemEntryForRawItem) {
          itemEntryForRawItem.itemIds.push(rawItem.id);
        } else {
          const infoForRawItem = state.itemInfos.find(
            (info) => info.id === rawItem.info_id
          );
          entriesForEvent.push({
            infoId: infoForRawItem.id,
            name: infoForRawItem.name,
            description: infoForRawItem.description,
            photo_url: infoForRawItem.photo_url,
            dimensions: infoForRawItem.dimensions,
            location: rawItem.location,
            itemIds: [rawItem.id],
          });
        }
      }
    });

    returnList.push({
      plannedTime: event.plannedTime,
      entries: entriesForEvent,
    });
  });

  if (!locatedRawItems.length) {
    return returnList;
  }

  let nonEventEntries: GenericListType[] = [];

  // format remaining raw entities
  locatedRawItems.forEach((rawItem) => {
    if (rawItem.group_id) {
      // item belongs in a group. Find group entry and add, or create new group.
      let groupEntryForRawItem: GroupType = nonEventEntries.find((entry) => {
        return !ListEntryIsItem(entry) && entry.groupId === rawItem.group_id;
      }) as GroupType;
      if (groupEntryForRawItem) {
        let itemEntryInGroupForRawItem = groupEntryForRawItem.items.find(
          (item) => {
            return item.infoId === rawItem.info_id;
          }
        );
        if (itemEntryInGroupForRawItem) {
          itemEntryInGroupForRawItem.itemIds.push(rawItem.id);
        } else {
          const infoForRawItem = state.itemInfos.find(
            (info) => info.id === rawItem.info_id
          );
          groupEntryForRawItem.items.push({
            infoId: infoForRawItem.id,
            name: infoForRawItem.name,
            description: infoForRawItem.description,
            photo_url: infoForRawItem.photo_url,
            dimensions: infoForRawItem.dimensions,
            location: rawItem.location,
            itemIds: [rawItem.id],
          });
        }
      } else {
        //group doesn't exist. Create new group and create item inside this group.
        const infoForRawItem = state.itemInfos.find(
          (info) => info.id === rawItem.info_id
        );
        const groupInfoForRawItem = state.itemGroups.find(
          (group) => group.id === rawItem.group_id
        );
        nonEventEntries.push({
          groupId: groupInfoForRawItem.id,
          name: groupInfoForRawItem.name,
          description: groupInfoForRawItem.description,
          photo_url: groupInfoForRawItem.photo_url,
          items: [
            {
              infoId: infoForRawItem.id,
              name: infoForRawItem.name,
              description: infoForRawItem.description,
              photo_url: infoForRawItem.photo_url,
              dimensions: infoForRawItem.dimensions,
              location: rawItem.location,
              itemIds: [rawItem.id],
            },
          ],
        });
      }
    } else {
      // item does not belong in a group. Add to existing item entry or create new.
      let itemEntryForRawItem: ItemType = nonEventEntries.find((entry) => {
        return ListEntryIsItem(entry) && entry.infoId === rawItem.info_id;
      }) as ItemType;
      if (itemEntryForRawItem) {
        itemEntryForRawItem.itemIds.push(rawItem.id);
      } else {
        const infoForRawItem = state.itemInfos.find(
          (info) => info.id === rawItem.info_id
        );
        nonEventEntries.push({
          infoId: infoForRawItem.id,
          name: infoForRawItem.name,
          description: infoForRawItem.description,
          photo_url: infoForRawItem.photo_url,
          dimensions: infoForRawItem.dimensions,
          location: rawItem.location,
          itemIds: [rawItem.id],
        });
      }
    }
  });

  returnList.push({
    entries: nonEventEntries,
  });

  return returnList;
};
