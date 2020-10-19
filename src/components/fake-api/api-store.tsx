import React, { createContext, useReducer } from 'react';
import ApiReducer from './api-reducer';
import {
  ItemInfo,
  ItemGroup,
  Dimensions,
  Item,
  TransportEvent,
} from '../../types/RawDataTypes';
import {} from '../../types/ItemListTypes';
import { LocationType, EventType } from '../../types/Enums';

const initialState = {
  events: [],
};

const ApiStore = ({ children }) => {
  const [state, dispatch] = useReducer(ApiReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);

export default ApiStore;
