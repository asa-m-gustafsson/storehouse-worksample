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
  onClick,
}: {
  type: OverlayButtonType;
  location: LocationType;
  onClick: () => void;
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
        return 'Visa Grupp';
      case OverlayButtonType.ViewItem:
        return 'Visa Kolli';
      case OverlayButtonType.EditGroup:
        return 'Redigera Grupp';
      case OverlayButtonType.EditItem:
        return 'Redigera Kolli';
      case OverlayButtonType.ShipGroup:
      case OverlayButtonType.ShipItem:
        switch (location) {
          case LocationType.Home:
            return 'Beställ Upphämntning';
          case LocationType.Storage:
          default:
            return 'Beställ Hemkörning';
        }
      case OverlayButtonType.AddItemToGroup:
        return 'Lägg till i Grupp';
      case OverlayButtonType.AddItemToNewGroup:
        return 'Skapa och lägg till i Ny Grupp';
      default:
        return '';
    }
  };
  return (
    <div className="c-overlay-menu__button">
      {getButtonIcon()}
      <span>{getButtonText()}</span>
    </div>
  );
};

export default OverlayButton;
