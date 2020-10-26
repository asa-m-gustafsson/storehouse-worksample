import { ItemEntity } from '../../types/raw-data-types';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
} from '../../types/item-types';
import { ApiStateType } from '../../types/api-types';
import { LocationType, EventType } from '../../types/enum-types';

export const updateGroupStatusForItemEntities = (
  itemEntities: ItemEntity[],
  actionGroup: GroupType
) => {
  return itemEntities.map((ie) => {
    let itemInActionGroup: ItemType = actionGroup.items.find(
      (iig) => iig.infoId === ie.info_id
    );
    if (itemInActionGroup && itemInActionGroup.itemIds.includes(ie.id)) {
      ie.group_id = actionGroup.groupId;
    } else {
      ie.group_id =
        ie.group_id === actionGroup.groupId ? undefined : ie.group_id;
    }
    return ie;
  });
};

// NOTE: There is A LOT of copy-pasted code below. In the future, break out into functions!

export const extractSingleGroupFromState = (
  state: ApiStateType,
  groupId: number
): GroupType => {
  const locatedRawGroup = state.itemGroups.find((ig) => ig.id === groupId);
  if (!locatedRawGroup) return undefined;

  const locatedGroupedItems = state.itemEntities.filter(
    (ie) => ie.group_id === groupId
  );

  return {
    groupId: locatedRawGroup.id,
    name: locatedRawGroup.name,
    description: locatedRawGroup.description,
    photo_url: locatedRawGroup.photo_url,
    items: convertRawItemsToItemTypeArray(state, locatedGroupedItems),
  };
};

export const extractGroupCandidateItemsFromState = (
  state: ApiStateType,
  sampleItemId: number
): ItemType[] => {
  // NOTE! This works on the premise that all items in a group can only exist at the same place, and be shipped together.
  const sampleItem = state.itemEntities.find((ie) => ie.id === sampleItemId);

  // if we can't find this item, we have no idea what location/transport event to select candidates from, which makes all of this useless.
  if (!sampleItem) {
    return [];
  }
  const eventToSelectFrom = state.events.find(
    (e) => e.plannedTime > new Date() && e.item_ids.includes(sampleItemId)
  );
  const rawItemPool = state.itemEntities.filter((ie) => {
    return (
      ie.location === sampleItem.location &&
      !ie.group_id &&
      (!eventToSelectFrom || eventToSelectFrom.item_ids.includes(ie.id))
    );
  });
  return convertRawItemsToItemTypeArray(state, rawItemPool);
};

export const convertRawItemsToItemTypeArray = (
  state: ApiStateType,
  items: ItemEntity[]
): ItemType[] => {
  // NOTE! This function does not take groups into account.
  // Only use for items you KNOW are not grouped, or all belong to the same group
  let returnArray: ItemType[] = [];

  items.forEach((item) => {
    let existingItemType = returnArray.find((gi) => gi.infoId === item.info_id);
    if (!existingItemType) {
      const infoForItem = state.itemInfos.find((ii) => ii.id === item.info_id);
      returnArray.push({
        infoId: item.info_id,
        name: infoForItem.name,
        description: infoForItem.description,
        photo_url: infoForItem.photo_url,
        dimensions: infoForItem.dimensions,
        location: item.location,
        itemIds: [item.id],
      });
    } else {
      existingItemType.itemIds.push(item.id);
    }
  });

  return returnArray;
};

export const extractItemListsFromState = (
  location: LocationType,
  state: ApiStateType
): ItemListForOverview[] => {
  // empty list to collect all overviewList
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
    // Restructuring needed to be able to extract this function into smaller pieces.
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
