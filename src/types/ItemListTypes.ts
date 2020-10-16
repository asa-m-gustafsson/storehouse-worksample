import { LocationType, EventType } from './Enums';

export interface ItemList {
  eventDate?: Date;
  items: GenericListEntry[];
}

export interface ItemListEntry {
  name: string;
  photo_url?: string;
  uniqueIdentifier: string;
  itemIds: number[];
}

export interface GroupListEntry {
  name: string;
  photo_url?: string;
  id: number;
  items: ItemListEntry[];
}

export type GenericListEntry = GroupListEntry | ItemListEntry;

export function ListEntryIsItem(
  listEntry: GenericListEntry
): listEntry is ItemListEntry {
  return listEntry !== undefined &&
    (listEntry as ItemListEntry).uniqueIdentifier
    ? true
    : false;
}

// export function ListEntryIsGroup()
