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

export interface ApiStateType {
  events: TransportEvent[];
  itemInfos: ItemInfo[];
  itemEntities: ItemEntity[];
  itemGroups: ItemGroup[];
}

interface IApiCreateNewGroupAction {
  type: 'CREATE_NEW_GROUP';
  group: GroupType;
}
interface IApiUpdateGroupAction {
  type: 'UPDATE_GROUP';
  group: GroupType;
}

export type ApiReducerAction = IApiCreateNewGroupAction | IApiUpdateGroupAction;
