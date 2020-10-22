import { useState, useContext, useEffect } from 'react';
import { GroupType, ItemType } from '../../types/item-types';
import { ApiContext } from '../fake-api/api-context';
import {
  extractSingleGroupFromState,
  extractGroupCandidateItemsFromState,
} from '../fake-api/api-converters';

const getItemGroupWithCandidates = (
  groupId: number,
  candidateItemId: number = 0
) => {
  const { state, dispatch } = useContext(ApiContext);
  const [itemGroupWithCandidates, setItemGroupWithCandidates] = useState<{
    group: GroupType;
    candidates: ItemType[];
  }>({
    group: {
      groupId: 0,
      name: '',
      items: [],
    },
    candidates: [],
  });

  useEffect(() => {
    let extractedGroup = itemGroupWithCandidates.group;
    if (groupId) {
      extractedGroup = extractSingleGroupFromState(state, groupId);
    }
    const extractedCandidates = extractGroupCandidateItemsFromState(
      state,
      extractedGroup.items[0]?.itemIds[0] ?? candidateItemId
    );
    setItemGroupWithCandidates({
      group: extractedGroup,
      candidates: extractedCandidates,
    });
  }, []);

  return itemGroupWithCandidates;
};

export default getItemGroupWithCandidates;
