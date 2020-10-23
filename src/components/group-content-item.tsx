import React, { useEffect, useState } from 'react';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
  GetTotalItemAmountForGroup,
  GetTotalItemAmountForList,
} from '../types/item-types';
import { SvgType, getSvg } from '../support/get-svg';

const GroupContentItem = ({
  item,
  checked,
  chosenAmount,
  maxAllowedAmount,
  handleCheck,
  changeAmount,
}: {
  item: ItemType;
  checked: boolean;
  chosenAmount: number;
  maxAllowedAmount: number;
  handleCheck: () => void;
  changeAmount: (newAmount: number) => void;
}) => {
  const [internalAmount, setInternalAmount] = useState<string>(
    chosenAmount.toString()
  );
  useEffect(() => {
    setInternalAmount(chosenAmount.toString());
  }, [chosenAmount]);

  const handleChangeAmount = (input: number) => {
    if (!isNaN(input)) {
      changeAmount(Math.max(0, Math.min(maxAllowedAmount, input)));
    } else {
      setInternalAmount(chosenAmount.toString());
    }
  };
  return (
    <div className="c-group-item">
      <p className="c-group-item__name">{item.name}</p>
      <div className="c-group-item__selectors">
        {maxAllowedAmount > 1 && (
          <div className="c-group-item__counter">
            <button
              className={`c-button c-button--quantity c-button--teal${
                chosenAmount === 0 ? '' : ''
              }`}
              disabled={chosenAmount === 0}
              onClick={() => {
                if (chosenAmount > 0) {
                  changeAmount(chosenAmount - 1);
                }
              }}
            >
              {getSvg(SvgType.Remove)}
            </button>
            <input
              className="c-group-item__chosen-amount"
              type="text"
              value={internalAmount}
              onChange={(e) => {
                // TODO Control this with regex!
                setInternalAmount(e.target.value);
                // let value = parseInt(e.target.value);
                // if (!isNaN(value)) {
                //   setInternalAmount(
                //     Math.max(0, Math.min(maxAllowedAmount, value))
                //   );
                // }
              }}
              onBlur={() => handleChangeAmount(parseInt(internalAmount))}
            />
            <button
              className={`c-button c-button--quantity c-button--teal${
                chosenAmount === maxAllowedAmount ? '' : ''
              }`}
              onClick={() => {
                if (chosenAmount < maxAllowedAmount) {
                  changeAmount(chosenAmount + 1);
                }
              }}
            >
              {getSvg(SvgType.Add)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupContentItem;
