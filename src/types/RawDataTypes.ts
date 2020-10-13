import { LocationType, EventType } from './Enums';

export interface ItemInfo {
  id: number;
  uniqueIdentifier: string; // GUID goes here
  name: string;
  description?: string;
  photo_url?: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  Height: number;
  Width: number;
  Depth: number;
}

export interface Item {
  id: number;
  //owner?
  info_identifier: string;
  group_id?: number;
  location: LocationType;
  //isActive?
}

export interface ItemGroup {
  id: number;
  //owner?
  name: string;
  description?: string;
  photo_url?: string;
}

export interface TransportEvent {
  id: number;
  type: EventType;
  // adress
  plannedTime: Date;
  item_ids: number[];
}
