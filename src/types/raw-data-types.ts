import { LocationType, EventType } from './enums';

export interface ItemInfo {
  id: number;
  name: string;
  description?: string;
  photo_url?: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  height: number;
  width: number;
  depth: number;
}

export interface ItemEntity {
  id: number;
  //owner?
  info_id: number;
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
