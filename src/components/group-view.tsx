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
import GroupContentItem from './group-content-item';

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
    (state: GroupType, newState): GroupType => ({ ...state, ...newState }),
    { groupId: 0, name: '', description: '', photo_url: '', items: [] }
  );
  useEffect(() => {
    console.log('changing group.');
    setEditedGroup({ ...group });
  }, [group]);

  const handleItemCheck = (
    itemToCheck: ItemType,
    itemFromEditedGroup: ItemType
  ) => {
    setEditedGroup({
      items: itemFromEditedGroup
        ? editedGroup.items.filter((i) => i.infoId !== itemToCheck.infoId)
        : editedGroup.items.concat([itemToCheck]),
    });
  };

  const handleChangeAmount = (
    newAmount: number,
    itemFromOriginalGroup: ItemType
  ) => {
    // 0, same as state. Positive, less than in state.
    // Negative is if more items of same infoId have been chosen from candidates
    const difference = itemFromOriginalGroup.itemIds.length - newAmount;
    let editedItemsCopy: ItemType[] = editedGroup.items;
    let editedItem = editedItemsCopy.find(
      (i) => i.infoId === itemFromOriginalGroup.infoId
    );

    // treat setting new amount to 0, or not finding edited item in group, as if item is checked
    // NOTE: if "checking" an item this way, amount is reset.
    if (newAmount === 0 || !editedItem) {
      handleItemCheck(itemFromOriginalGroup, editedItem);
    } else if (difference > 0) {
      editedItem.itemIds = itemFromOriginalGroup.itemIds.slice(0, -difference);
    } else if (difference < 0) {
      console.log('trying to add more items!');
    } else {
      // difference === 0, same as unchanged
      editedItem.itemIds = itemFromOriginalGroup.itemIds;
    }
    setEditedGroup({ items: editedItemsCopy });
  };

  console.log(group);
  console.log(editedGroup);
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
      <div className="c-group-contents">
        {group.items.map((item, key) => {
          const itemInEditedGroup = editedGroup.items.find(
            (i) => i.infoId === item.infoId
          );
          // console.log(item);
          return (
            <GroupContentItem
              key={key}
              item={item}
              checked={!!itemInEditedGroup}
              chosenAmount={itemInEditedGroup?.itemIds.length ?? 0}
              maxAllowedAmount={
                item.itemIds.length
                // uncomment when implementing adding more items of same type directly in group contents
                //+ candidates.find(i => i.infoId === item.infoId)?.itemIds.length ?? 0
              }
              handleCheck={() => handleItemCheck(item, itemInEditedGroup)}
              changeAmount={(newAmount) => handleChangeAmount(newAmount, item)}
            />
          );
        })}
      </div>
    </>
  );
};

export default GroupView;
