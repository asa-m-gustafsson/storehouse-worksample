import React, { useState, useContext, useEffect, useReducer } from 'react';
import '../styles/group-view.less';
import { ItemType, GroupType } from '../types/item-types';
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
    {
      groupId: 0,
      name: '',
      description: '',
      photo_url: '',
      items: itemIdsToAdd.length
        ? candidates.filter((item) =>
            itemIdsToAdd.some((id) => item.itemIds.includes(id))
          )
        : [],
    }
  );
  useEffect(() => {
    const copyOfGroup: GroupType = JSON.parse(JSON.stringify(group));
    if (itemIdsToAdd.length) {
      const addItems = candidates.filter((item) =>
        itemIdsToAdd.some((id) => item.itemIds.includes(id))
      );
      copyOfGroup.items = copyOfGroup.items.concat(addItems);
    }
    setEditedGroup(copyOfGroup);
  }, [group, candidates]);

  const handleItemCheck = (
    itemToCheck: ItemType,
    itemFromEditedGroup: ItemType
  ) => {
    const newItemArray: ItemType[] = itemFromEditedGroup
      ? editedGroup.items.filter((i) => i.infoId !== itemToCheck.infoId)
      : editedGroup.items.concat([itemToCheck]);
    setEditedGroup({
      items: newItemArray,
    });
  };

  const handleChangeAmount = (
    newAmount: number,
    itemFromOriginalGroup: ItemType
  ) => {
    // 0, same as state. Positive, less than in state.
    // Negative is if more items of same infoId have been chosen from candidates
    const difference = itemFromOriginalGroup.itemIds.length - newAmount;
    let editedItemsCopy: ItemType[] = JSON.parse(
      JSON.stringify(editedGroup.items)
    );
    let editedItem = editedItemsCopy.find(
      (i) => i.infoId === itemFromOriginalGroup.infoId
    );
    // treat setting new amount to 0, or not finding edited item in group, as if item is checked
    // NOTE: if "checking" an item this way, amount is reset.
    if (newAmount === 0 || !editedItem) {
      handleItemCheck(itemFromOriginalGroup, editedItem);
    } else {
      if (difference > 0) {
        editedItem.itemIds = itemFromOriginalGroup.itemIds.slice(
          0,
          -difference
        );
      } else if (difference < 0) {
        const itemAsCandidate = candidates.find(
          (i) => i.infoId === itemFromOriginalGroup.infoId
        );
        if (itemAsCandidate) {
          editedItem.itemIds = itemFromOriginalGroup.itemIds.concat(
            itemAsCandidate.itemIds.slice(0, -difference)
          );
        }
      } else {
        // difference === 0, same as unchanged
        editedItem.itemIds = itemFromOriginalGroup.itemIds;
      }
      setEditedGroup({ items: editedItemsCopy });
    }
  };
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
        <div className="c-group-contents__list-wrapper">
          <div className="c-group-contents__list-header">
            <span>Kollin tillhörande grupp</span>
          </div>
          <div className="c-group-contents__list">
            {group.items.map((item, key) => {
              const itemInEditedGroup = editedGroup.items.find(
                (i) => i.infoId === item.infoId
              );
              // console.log('amount of items in group: ', item.itemIds.length);
              // console.log(
              //   'amount of candidates to add: ',
              //   candidates.find((i) => i.infoId === item.infoId)?.itemIds
              //     .length ?? 0
              // );
              return (
                <GroupContentItem
                  key={key}
                  item={item}
                  checked={!!itemInEditedGroup}
                  chosenAmount={itemInEditedGroup?.itemIds.length ?? 0}
                  maxAllowedAmount={
                    item.itemIds.length +
                    // uncomment when implementing adding more items of same type directly in group contents
                    (candidates.find((i) => i.infoId === item.infoId)?.itemIds
                      .length ?? 0)
                  }
                  handleCheck={() => handleItemCheck(item, itemInEditedGroup)}
                  changeAmount={(newAmount) =>
                    handleChangeAmount(newAmount, item)
                  }
                  allowEdit={editMode}
                />
              );
            })}
          </div>
        </div>
        <div
          className={`c-group-contents__list-wrapper${
            editMode ? '' : ' c-group-contents__list-wrapper--hidden'
          }`}
        >
          <div className="c-group-contents__list-header">
            <span>Kollin som kan läggas till i grupp</span>
          </div>
          <div className="c-group-contents__list">
            {candidates.map((item, key) => {
              const itemInEditedGroup = editedGroup.items.find(
                (i) => i.infoId === item.infoId
              );
              return (
                <GroupContentItem
                  key={key}
                  item={item}
                  checked={!!itemInEditedGroup}
                  chosenAmount={itemInEditedGroup?.itemIds.length ?? 0}
                  maxAllowedAmount={
                    item.itemIds.length +
                    (group.items.find((i) => i.infoId === item.infoId)?.itemIds
                      .length ?? 0)
                  }
                  handleCheck={() => handleItemCheck(item, itemInEditedGroup)}
                  changeAmount={(newAmount) =>
                    handleChangeAmount(newAmount, item)
                  }
                  allowEdit={editMode}
                />
              );
            })}
          </div>
        </div>
        <button
          className="c-button c-button--teal c-button--full-width"
          //TODO add disabled if no changes are made
          disabled={!editedGroup.name || !editedGroup.items.length}
          onClick={() =>
            group.groupId === 0
              ? dispatch({ type: 'CREATE_NEW_GROUP', group: editedGroup })
              : dispatch({ type: 'UPDATE_GROUP', group: editedGroup })
          }
        >
          <span className="c-button__text">Spara ändringar</span>
        </button>
      </div>
    </>
  );
};

export default GroupView;
