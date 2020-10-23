import React, { useState, useContext, useEffect, useReducer } from 'react';
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
import { SvgType, getSvg } from '../support/get-svg';

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
  const [editedGroup, setEditedGroup] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { groupId: 0, name: '', description: '', photo_url: '', items: [] }
  );
  useEffect(() => {
    setEditedGroup(group);
  }, [group]);

  return (
    <>
      <div className="c-group-info">
        <div className="c-group-info__picture-wrapper">
          <img
            src={group.photo_url ?? 'https://www.placecage.com/g/700/500'}
            alt={group.name}
            className="c-group-info__picture"
          />
        </div>
        <div className="c-group-info__name-region">
          {editMode ? (
            <input
              className="c-group-info__input"
              type="text"
              value={editedGroup.name}
              onChange={(e) => setEditedGroup({ name: e.target.value })}
            />
          ) : (
            <span>{group.name}</span>
          )}
          <div
            className={`c-group-info__edit-icon${
              editMode ? ' c-group-info__edit-icon--cancel' : ''
            }`}
            onClick={() => setEditMode(!editMode)}
          >
            {getSvg(editMode ? SvgType.Exit : SvgType.Edit)}
          </div>
        </div>
        <div className="c-group-info__cost-region">
          <span>totalkostnad XXXX kr/mån</span>
        </div>
      </div>
      <div
        className="c-group-contents"
        // onClick={() => setEditMode(!editMode)}
      ></div>
    </>
  );
};

export default GroupView;
