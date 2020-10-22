import { useState, useContext, useEffect } from 'react';
import { ItemListForOverview } from '../../types/item-types';
import { LocationType } from '../../types/enums';
import { ApiContext } from '../fake-api/api-context';
import { extractItemListsFromState } from '../fake-api/api-converters';

const getItemLists = (location: LocationType) => {
  const { state, dispatch } = useContext(ApiContext);
  const [itemLists, setItemLists] = useState<ItemListForOverview[]>([]);

  useEffect(() => {
    setItemLists(extractItemListsFromState(location, state));
  }, []);

  return itemLists;
};

export default getItemLists;
