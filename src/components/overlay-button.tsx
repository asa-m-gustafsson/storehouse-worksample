import React from 'react';
import { SvgType, getSvg } from '../support/get-svg';
import { LocationType } from '../types/enums';

export enum OverlayButtonType {
  ViewGroup,
  ViewItem,
  EditGroup,
  EditItem,
  ShipGroup,
  ShipItem,
  AddItemToGroup,
  AddItemToNewGroup,
}

const OverlayButton = ({
  type,
  location,
  handleClick,
}: {
  type: OverlayButtonType;
  location: LocationType;
  handleClick: () => void;
}) => {
  const getButtonIcon = (): JSX.Element => {
    switch (type) {
      case OverlayButtonType.ViewGroup:
      case OverlayButtonType.ViewItem:
        return getSvg(SvgType.View);
      case OverlayButtonType.EditGroup:
      case OverlayButtonType.EditItem:
        return getSvg(SvgType.Edit);
      case OverlayButtonType.ShipGroup:
      case OverlayButtonType.ShipItem:
        return getSvg(SvgType.Ship);
      case OverlayButtonType.AddItemToGroup:
      case OverlayButtonType.AddItemToNewGroup:
        return getSvg(SvgType.Add);
      default:
        return <></>;
    }
  };
  const getButtonText = (): string => {
    switch (type) {
      case OverlayButtonType.ViewGroup:
        return 'Visa grupp';
      case OverlayButtonType.ViewItem:
        return 'Visa kolli';
      case OverlayButtonType.EditGroup:
        return 'Redigera grupp';
      case OverlayButtonType.EditItem:
        return 'Redigera kolli';
      case OverlayButtonType.ShipGroup:
      case OverlayButtonType.ShipItem:
        switch (location) {
          case LocationType.Home:
            return 'Beställ upphämntning';
          case LocationType.Storage:
          default:
            return 'Beställ hemkörning';
        }
      case OverlayButtonType.AddItemToGroup:
        return 'Lägg till i befintlig grupp';
      case OverlayButtonType.AddItemToNewGroup:
        return 'Lägg till i ny grupp';
      default:
        return '';
    }
  };
  return (
    <div className="c-overlay-menu__button-wrapper">
      <div
        className="c-overlay-menu__button"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {getButtonIcon()}
        <span>{getButtonText()}</span>
      </div>
    </div>
  );
};

export default OverlayButton;
