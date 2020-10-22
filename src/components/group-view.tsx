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

const GroupView = ({
  group,
  candidates,
  openOnEdit,
  itemIdsToAdd,
}: {
  group: GroupType;
  candidates: ItemType[];
  openOnEdit: boolean;
  itemIdsToAdd: number[];
}) => {
  const { state, dispatch } = useContext(ApiContext);
  const [editMode, setEditMode] = useState<boolean>(openOnEdit);
  const [editedGroup, setEditedGroup] = useState<GroupType>(undefined);
  useEffect(() => {
    setEditedGroup(group);
  }, []);
  console.log(editedGroup);
  return (
    <>
      <div className="c-group-info"></div>
      <div
        className="c-group-contents"
        // onClick={() => setEditMode(!editMode)}
      ></div>
    </>
  );
};

export default GroupView;
