import React, { useState, useContext, useEffect } from 'react';
import '../styles/group-view.less';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
  GetTotalItemAmountForGroup,
  GetTotalItemAmountForList,
} from '../types/item-types';
import { LocationType, EventType } from '../types/enums';
import { ApiContext } from '../support/fake-api/api-context';
import getGroupCandidates from '../support/hooks/get-group-candidates';
import { extractGroupCandidateItemsFromState } from '../support/fake-api/api-converters';

const GroupView = ({
  group,
  openOnEdit,
  itemIdsToAdd,
}: {
  group: GroupType;
  openOnEdit: boolean;
  itemIdsToAdd: number[];
}) => {
  const { state, dispatch } = useContext(ApiContext);
  const [editMode, setEditMode] = useState<boolean>(openOnEdit);
  const sampleItemId = group.items[0]?.itemIds[0] ?? itemIdsToAdd[0] ?? 0;
  const [groupCandidates, setGroupCandidates] = useState<ItemType[]>([]);
  console.log(openOnEdit);
  console.log(editMode);
  console.log(group);
  console.log(groupCandidates);
  console.log(sampleItemId);
  useEffect(() => {
    if (editMode && !groupCandidates.length) {
      console.log('editMode effect!');
      setGroupCandidates(
        extractGroupCandidateItemsFromState(
          state,
          group.items[0]?.itemIds[0] ?? itemIdsToAdd[0] ?? 0
        )
      );
    }
  }, [editMode]);
  return (
    <>
      <div className="c-group-info"></div>
      <div
        className="c-group-contents"
        onClick={() => setEditMode(!editMode)}
      ></div>
    </>
  );
};

export default GroupView;
