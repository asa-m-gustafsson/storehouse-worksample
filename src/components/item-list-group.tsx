import React, { useState, useRef, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { GroupType, GetTotalItemAmountForGroup } from '../types/item-types';
import ItemListItem from './item-list-item';
import useLongPress from '../support/hooks/use-long-press';
import OverlayMenu from './overlay-menu';

const ItemListGroup = ({
  group,
  expanded,
  toggleExpanded,
}: {
  group: GroupType;
  expanded: boolean;
  toggleExpanded: (id: number) => void;
}) => {
  if (!group.items.length) {
    return null;
  }
  const [popupState, setPopupState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { showPopup: false, clientX: 0, clientY: 0 }
  );
  const cardRef = useRef(null);
  const router = useRouter();
  var popupBtnContainerMaxWidth = 200;

  const handleClick = () => {
    toggleExpanded(expanded ? 0 : group.groupId);
  };
  const handleLongPress = (e, xValue, yValue) => {
    var sanitizedXValue = Math.min(
      (cardRef?.current?.offsetWidth ?? 0) - popupBtnContainerMaxWidth / 2,
      Math.max(popupBtnContainerMaxWidth / 2, xValue)
    );
    setPopupState({
      showPopup: true,
      clientX: xValue,
      clientY: yValue,
    });
  };
  const longPressEvent = useLongPress(handleLongPress, handleClick, {
    shouldPreventDefault: true,
    delay: 1000,
  });

  return (
    <div className="c-item-group">
      <OverlayMenu
        show={popupState.showPopup}
        middlePointX={popupState.clientX}
        middlePointY={popupState.clientY}
        maxWidth={popupBtnContainerMaxWidth}
        handleClose={() => setPopupState({ showPopup: false })}
      >
        <div className="c-overlay-menu__button"></div>
      </OverlayMenu>
      <div
        className="c-item-card c-item-card--group"
        {...longPressEvent}
        ref={cardRef}
      >
        <div className="c-item-card__left-wrapper">
          <div className="c-item-card__picture">
            <img
              src={group.photo_url ?? 'https://www.placecage.com/c/200/300'}
              alt={group.name}
            />
          </div>
          <span className="c-item-card__item-text">{group.name}&nbsp;</span>
          <span className="c-item-card__item-text c-item-card__item-text--details">
            {` - Grupp (${GetTotalItemAmountForGroup(group)} kollin)`}
          </span>
        </div>
        <h1>{`>`}</h1>
      </div>
      <div
        className={`c-item-group__list${
          expanded ? ' c-item-group__list--expanded' : ''
        }`}
        style={
          expanded
            ? {
                height: `${
                  (cardRef?.current?.offsetHeight ?? 0) * group.items.length
                }px`,
              }
            : { height: 0 }
        }
      >
        {group.items.map((item, entryIndex) => (
          <ItemListItem key={entryIndex} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemListGroup;
