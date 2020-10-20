import {
  ItemInfo,
  ItemGroup,
  Dimensions,
  ItemEntity,
  TransportEvent,
} from './raw-data-types';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
} from './item-types';

export type ApiStateType = {
  itemLists: ItemListForOverview[];
  events: TransportEvent[];
  itemInfos: ItemInfo[];
  itemEntities: ItemEntity[];
  itemGroups: ItemGroup[];
};

interface IApiAddItemsToGroupAction {
  type: 'ADD_ITEMS_TO_GROUP';
  itemsToAdd: number[];
  groupToAddTo: number;
}
interface IApiRemoveItemsFromGroupAction {
  type: 'REMOVE_ITEMS_FROM_GROUP';
  itemsToRemove: number[];
  groupToRemoveFrom: number;
}

export type ApiReducerAction =
  | IApiAddItemsToGroupAction
  | IApiRemoveItemsFromGroupAction;
