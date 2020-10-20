import { LocationType, EventType } from './enums';

export interface ItemListForOverview {
  eventDate?: Date;
  items: GenericListEntry[];
  totalItemAmount?: number;
}

export interface ItemListEntry {
  name: string;
  photo_url?: string;
  infoId: number;
  uniqueIdentifier?: string;
  itemIds: number[];
}

export interface GroupListEntry {
  name: string;
  photo_url?: string;
  id: number;
  items: ItemListEntry[];
  totalItemAmount?: number;
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
