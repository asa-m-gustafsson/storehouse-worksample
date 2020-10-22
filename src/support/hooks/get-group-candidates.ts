import { useState, useContext, useEffect } from 'react';
import { ItemType } from '../../types/item-types';
import { ApiContext } from '../fake-api/api-context';
import { extractGroupCandidateItemsFromState } from '../fake-api/api-converters';

// hook does not work as intended, double hook calls... nope. Scrap?
const getGroupCandidates = (itemId: number) => {
  const { state, dispatch } = useContext(ApiContext);
  const [groupCandidates, setGroupCandidates] = useState<ItemType[]>([]);

  useEffect(() => {
    if (itemId) {
      setGroupCandidates(extractGroupCandidateItemsFromState(state, itemId));
    }
  }, []);

  return groupCandidates;
};

export default getGroupCandidates;
