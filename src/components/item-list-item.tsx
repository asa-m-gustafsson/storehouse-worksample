import React, { useReducer } from 'react';
import { useRouter } from 'next/router';
import { ItemType } from '../types/item-types';
import { SvgType, getSvg } from '../support/get-svg';
import useLongPress from '../support/hooks/use-long-press';
import OverlayMenu from './overlay-menu';
import OverlayButton, { OverlayButtonType } from './overlay-button';

const ItemListItem = ({
  item,
  hasGroup,
}: {
  item: ItemType;
  hasGroup: boolean;
}) => {
  const [popupState, setPopupState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { showPopup: false, clientX: 0, clientY: 0 }
  );
  const router = useRouter();
  const handleClick = () => {
    console.log('not implemented!');
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
      <div className="c-item-card" {...longPressEvent}>
        <div className="c-item-card__left-wrapper">
          <div className="c-item-card__picture-wrapper">
            <img
              className="c-item-card__picture"
              src={item.photo_url ?? 'https://www.placecage.com/g/200/300'}
              alt={item.name}
            />
          </div>
          <span className="c-item-card__item-text">{item.name}&nbsp;</span>
          <span className="c-item-card__item-text c-item-card__item-text--details">
            {item.itemIds.length > 1 ? ` (${item.itemIds.length} st)` : ''}
          </span>
        </div>
        <div className="c-item-card__chevron">{getSvg(SvgType.Forward)}</div>
      </div>
      <OverlayMenu
        show={popupState.showPopup}
        middlePointX={popupState.clientX}
        middlePointY={popupState.clientY}
        handleClose={() => setPopupState({ showPopup: false })}
      >
        <OverlayButton
          type={OverlayButtonType.ShipItem}
          location={item.location}
          handleClick={() => console.log('Not implemented!')}
        />
        {!hasGroup && (
          <OverlayButton
            type={OverlayButtonType.AddItemToNewGroup}
            location={item.location}
            handleClick={() =>
              router.push({
                pathname: '/group',
                query: { itemIdsToAdd: item.itemIds },
              })
            }
          />
        )}
      </OverlayMenu>
    </>
  );
};

export default ItemListItem;
