import {
  ItemInfo,
  ItemGroup,
  Dimensions,
  ItemEntity,
  TransportEvent,
} from '../../types/raw-data-types';
// import {
//   ItemListForOverview,
//   ItemListEntry,
//   GroupListEntry,
//   GenericListEntry,
// } from '../../types/item-list-types';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
  GetTotalItemAmountForList,
} from '../../types/item-types';
import { ApiStateType } from '../../types/api-types';
import { LocationType, EventType } from '../../types/enums';

export interface IApiConverter {}

export default class ApiConverter implements IApiConverter {
  extractItemListFromState = (
    location: LocationType,
    state: ApiStateType
  ): ItemListForOverview[] => {
    const locatedItems = state.itemEntities.filter(
      (ie) => ie.location === location
    );
    let returnList: ItemListForOverview[] = [];
    // locatedItems.forEach(item=>{
    //   const indexOfEventForItem = returnList.findIndex((event) => event.items.find(i => ))
    // });
    // let formattedItems: ItemListEntry[] = [];
    // locatedItems.forEach((item) => {
    //   const indexOfFormattedItem = formattedItems.findIndex((fi) =>
    //     fi.itemIds.includes(item.id)
    //   );
    //   if (indexOfFormattedItem === -1) {
    //     const itemInfo = state.itemInfos.find((info) => info.id === item.info_id);
    //     formattedItems.push({
    //       name: itemInfo.name,
    //       photo_url: itemInfo.photo_url,
    //       infoId: itemInfo.id,
    //       itemIds: [item.id],
    //     });
    //   }
    // });
    return returnList;
  };
}
