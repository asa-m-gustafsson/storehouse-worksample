import React, { createContext, useReducer } from 'react';
import ApiReducer from './api-reducer';
import { LocationType, EventType } from '../../types/enum-types';
import { ApiStateType, ApiReducerAction } from '../../types/api-types';

const initialState: ApiStateType = {
  itemInfos: [
    {
      id: 1,
      name: 'Verktygslåda',
      description: 'Farfars gamla verktygslåda och hans verktyg.',
      photo_url: 'https://www.placecage.com/c/400/800',
      dimensions: { height: 40, width: 30, depth: 60 },
    },
    {
      id: 2,
      name: 'Lasse Giraff',
      photo_url: 'https://www.placekitten.com/400/800',
      dimensions: { height: 430, width: 100, depth: 180 },
    },
    {
      id: 3,
      name: 'Vattenskål',
      description: 'Lasse Giraffs favoritvattenskål. Med ställning.',
      photo_url: 'https://www.placecage.com/900/800',
      dimensions: { height: 60, width: 50, depth: 50 },
    },
    {
      id: 4,
      name: 'Giraffstrumpa',
      description: 'Långstrumpa för kalla giraffben',
      photo_url: 'https://www.placecage.com/200/100',
      dimensions: { height: 80, width: 15, depth: 20 },
    },
    {
      id: 5,
      name: 'Matbord',
      photo_url: 'https://www.placecage.com/c/800/400',
      dimensions: { height: 70, width: 120, depth: 160 },
    },
    {
      id: 6,
      name: 'Matsalsstol',
      photo_url: 'https://www.placecage.com/c/1600/800',
      dimensions: { height: 120, width: 60, depth: 60 },
    },
    {
      id: 7,
      name: 'Snowboard',
      photo_url: 'https://www.placecage.com/800/400',
      dimensions: { height: 20, width: 30, depth: 140 },
    },
    {
      id: 8,
      name: 'Julgran',
      description: 'Plastgran i halvstorlek',
      photo_url: 'https://www.placecage.com/c/200/300',
      dimensions: { height: 20, width: 20, depth: 140 },
    },
    {
      id: 9,
      name: 'Julgranspynt',
      description: 'Flyttkartong med julgranspynt',
      photo_url: 'https://placekitten.com/400/300',
      dimensions: { height: 40, width: 30, depth: 60 },
    },
    {
      id: 10,
      name: 'Julbelysning (utomhus)',
      description: 'Flyttkartong med julbelysning för utomhusbruk',
      photo_url: 'https://www.placekitten.com/900/600',
      dimensions: { height: 40, width: 30, depth: 60 },
    },
    {
      id: 11,
      name: 'Jultextilier',
      description: 'Flyttkartong med juldukar, julgardiner o dyl',
      photo_url: 'https://www.placecage.com/800/600',
      dimensions: { height: 40, width: 30, depth: 60 },
    },
    {
      id: 12,
      name: 'Cafébord',
      description: 'Runt bord i metall, för uteserveringar på caféer',
      photo_url: 'https://www.placecage.com/400/600',
      dimensions: { height: 70, width: 120, depth: 120 },
    },
    {
      id: 13,
      name: 'Caféstol',
      description: 'Stol i metall, för uteserveringar på caféer',
      photo_url: 'https://www.placecage.com/600/400',
      dimensions: { height: 100, width: 70, depth: 70 },
    },
    {
      id: 14,
      name: 'Laserkanon',
      description: 'Med fäste anpassat för giraff',
      photo_url: 'https://www.placecage.com/c/300/500',
      dimensions: { height: 80, width: 110, depth: 120 },
    },
  ],
  itemEntities: [
    { id: 1, info_id: 1, location: LocationType.Home },
    { id: 2, info_id: 2, location: LocationType.Storage, group_id: 1 },
    { id: 3, info_id: 3, location: LocationType.Storage, group_id: 1 },
    { id: 4, info_id: 4, location: LocationType.Storage, group_id: 1 },
    { id: 5, info_id: 4, location: LocationType.Storage, group_id: 1 },
    { id: 6, info_id: 4, location: LocationType.Storage, group_id: 1 },
    { id: 7, info_id: 4, location: LocationType.Storage, group_id: 1 },
    { id: 8, info_id: 5, location: LocationType.Home },
    { id: 9, info_id: 6, location: LocationType.Home },
    { id: 10, info_id: 6, location: LocationType.Home },
    { id: 11, info_id: 6, location: LocationType.Home },
    { id: 12, info_id: 6, location: LocationType.Home },
    { id: 13, info_id: 7, location: LocationType.Storage },
    { id: 14, info_id: 8, location: LocationType.Storage, group_id: 2 },
    { id: 15, info_id: 9, location: LocationType.Storage, group_id: 2 },
    { id: 16, info_id: 9, location: LocationType.Storage, group_id: 2 },
    { id: 17, info_id: 10, location: LocationType.Storage, group_id: 2 },
    { id: 18, info_id: 11, location: LocationType.Storage },
    { id: 19, info_id: 12, location: LocationType.Home, group_id: 3 },
    { id: 20, info_id: 12, location: LocationType.Home },
    { id: 21, info_id: 12, location: LocationType.Home },
    { id: 22, info_id: 12, location: LocationType.Home },
    { id: 23, info_id: 12, location: LocationType.Storage },
    { id: 24, info_id: 12, location: LocationType.Storage },
    { id: 25, info_id: 12, location: LocationType.Storage },
    { id: 26, info_id: 13, location: LocationType.Home, group_id: 3 },
    { id: 27, info_id: 13, location: LocationType.Home, group_id: 3 },
    { id: 28, info_id: 13, location: LocationType.Home },
    { id: 29, info_id: 13, location: LocationType.Home },
    { id: 30, info_id: 13, location: LocationType.Home },
    { id: 31, info_id: 13, location: LocationType.Home },
    { id: 32, info_id: 13, location: LocationType.Home },
    { id: 33, info_id: 13, location: LocationType.Home },
    { id: 34, info_id: 13, location: LocationType.Storage },
    { id: 35, info_id: 13, location: LocationType.Storage },
    { id: 36, info_id: 13, location: LocationType.Storage },
    { id: 37, info_id: 13, location: LocationType.Storage },
    { id: 38, info_id: 13, location: LocationType.Storage },
    { id: 39, info_id: 13, location: LocationType.Storage },
    { id: 40, info_id: 14, location: LocationType.Storage, group_id: 1 },
  ],
  itemGroups: [
    {
      id: 1,
      name: 'Giraff med Tillbehör',
      description:
        'Giraffen Lasse och de tillbehör som krävs för att ta hand om en giraff',
    },
    {
      id: 2,
      name: 'Julpynt',
      photo_url: 'https://www.placecage.com/c/200/100',
      description: 'Allt vårt j*vla julpynt',
    },
    {
      id: 3,
      name: 'Cafégrupp',
    },
  ],
  events: [
    {
      id: 1,
      type: EventType.Retrieval,
      plannedTime: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      item_ids: [13, 14, 15, 16, 17, 18],
    },
    {
      id: 2,
      type: EventType.Storage,
      plannedTime: new Date(new Date().setDate(new Date().getDate() + 1)),
      item_ids: [],
    },
    {
      id: 3,
      type: EventType.Storage,
      plannedTime: new Date(new Date().setDate(new Date().getDate() + 5)),
      item_ids: [],
    },
  ],
};

const ApiContext = createContext<{
  state: ApiStateType;
  dispatch: React.Dispatch<ApiReducerAction>;
}>({ state: initialState, dispatch: () => null });

const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ApiReducer, initialState);
  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
