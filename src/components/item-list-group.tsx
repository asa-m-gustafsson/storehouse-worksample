import React, { useRef, useReducer } from 'react';
import { useRouter } from 'next/router';
import { GroupType, GetTotalItemAmountForGroup } from '../types/item-types';
import ItemListItem from './item-list-item';
import useLongPress from '../support/hooks/use-long-press';
import OverlayMenu from './overlay-menu';
import OverlayButton, { OverlayButtonType } from './overlay-button';
import { SvgType, getSvg } from '../support/get-svg';

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

  const handleClick = () => {
    toggleExpanded(expanded ? 0 : group.groupId);
  };
  const handleLongPress = (e, xValue, yValue) => {
    setPopupState({
      showPopup: true,
      clientX: xValue,
      clientY: yValue,
    });
  };
  const longPressEvent = useLongPress(handleLongPress, handleClick, {
    shouldPreventDefault: true,
    delay: 500,
  });

  return (
    <>
      <div className="c-item-group">
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
            <div>
              <p className="c-item-card__item-text">{group.name}</p>
              <p className="c-item-card__item-text c-item-card__item-text--details">
                {`Grupp (${GetTotalItemAmountForGroup(group)} kollin)`}
              </p>
            </div>
          </div>
          <div
            className={`c-item-card__chevron${
              expanded ? ' c-item-card__chevron--expanded' : ''
            }`}
          >
            {getSvg(SvgType.Expand)}
          </div>
        </div>
        <div
          className="c-item-group__list"
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
      <OverlayMenu
        show={popupState.showPopup}
        middlePointX={popupState.clientX}
        middlePointY={popupState.clientY}
        handleClose={() => setPopupState({ showPopup: false })}
      >
        <OverlayButton
          type={OverlayButtonType.ShipGroup}
          location={group.items[0].location}
          handleClick={() => console.log('Not implemented!')}
        />
        <OverlayButton
          type={OverlayButtonType.ViewGroup}
          location={group.items[0].location}
          handleClick={() => console.log('viewGroup!')}
        />
        <OverlayButton
          type={OverlayButtonType.EditGroup}
          location={group.items[0].location}
          handleClick={() => console.log('editGroup!')}
        />
      </OverlayMenu>
    </>
  );
};

export default ItemListGroup;
