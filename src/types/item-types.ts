import { LocationType, EventType } from './enums';

export type ItemListForOverview = {
  plannedTime?: Date;
  entries: GenericListType[];
};

export interface Dimensions {
  height: number;
  width: number;
  depth: number;
}

export type ItemType = {
  infoId: number;
  name: string;
  description?: string;
  photo_url?: string;
  dimensions: Dimensions;
  itemIds: number[];
};

export type GroupType = {
  groupId: number;
  name: string;
  description?: string;
  photo_url?: string;
  items: ItemType[];
};

export type GenericListType = GroupType | ItemType;

export const ListEntryIsItem = (
  genericEntry: GenericListType
): genericEntry is ItemType => {
  return genericEntry !== undefined && (genericEntry as ItemType).infoId
    ? true
    : false;
};

export const GetTotalItemAmountForGroup = (group: GroupType): number => {
  return group.items.reduce((total, currentItem) => {
    return total + currentItem.itemIds.length;
  }, 0);
};

export const GetTotalItemAmountForList = (
  list: ItemListForOverview
): number => {
  return list.entries.reduce((total, currentEntry) => {
    return (
      total +
      (ListEntryIsItem(currentEntry)
        ? currentEntry.itemIds.length
        : GetTotalItemAmountForGroup(currentEntry))
    );
  }, 0);
};

const FindItemFromMultipleLists = (
  itemId: number,
  itemLists: ItemListForOverview[]
): ItemType => {
  // const test = state.itemLists.find(itemList => {
  //   return itemList.entries.find(entry => {
  //     if(ListEntryIsItem(entry)){
  //       return entry.itemIds.includes(itemId);
  //     } else {
  //       return entry.items.find(item => {
  //         return item.itemIds.includes(itemId);
  //       })
  //     };
  //   })
  // })

  itemLists.forEach((itemList) => {
    itemList.entries.find((entry) => {
      if (ListEntryIsItem(entry)) {
        return entry.itemIds.includes(itemId);
      } else {
        return entry.items.find((item) => {
          return item.itemIds.includes(itemId);
        });
      }
    });
  });
  return null;
};
