import { ItemGroup, ItemEntity } from '../../types/raw-data-types';
import { ApiStateType, ApiReducerAction } from '../../types/api-types';
import { updateGroupStatusForItemEntities } from './api-converters';

const ApiReducer = (state: ApiStateType, action: ApiReducerAction) => {
  switch (action.type) {
    case 'CREATE_NEW_GROUP':
      console.log(action.group);
      const newId: number =
        state.itemGroups.reduce((maxValue, group) => {
          return Math.max(group.id, maxValue);
        }, 1) + 1;
      const groupForState: ItemGroup = {
        id: newId,
        name: action.group.name,
        description: action.group.description
          ? action.group.description
          : undefined,
        photo_url: action.group.photo_url ? action.group.photo_url : undefined,
      };

      const ng_updatedItemEntities: ItemEntity[] = updateGroupStatusForItemEntities(
        state.itemEntities,
        Object.assign(action.group, { groupId: newId })
      );
      return {
        ...state,
        itemGroups: [...state.itemGroups, groupForState],
        itemEntities: ng_updatedItemEntities,
      };
    case 'UPDATE_GROUP':
      let ug_updatedItemGroups = state.itemGroups;
      const groupIndexInState = ug_updatedItemGroups.findIndex(
        (ig) => ig.id === action.group.groupId
      );
      if (groupIndexInState !== -1) {
        ug_updatedItemGroups[groupIndexInState] = {
          id: ug_updatedItemGroups[groupIndexInState].id,
          name: action.group.name,
          description: action.group.description
            ? action.group.description
            : undefined,
          photo_url: action.group.photo_url
            ? action.group.photo_url
            : undefined,
        };
      }
      const ug_updatedItemEntities: ItemEntity[] = updateGroupStatusForItemEntities(
        state.itemEntities,
        action.group
      );
      return {
        ...state,
        itemGroups: ug_updatedItemGroups,
        itemEntities: ug_updatedItemEntities,
      };
    default:
      return state;
  }
};

export default ApiReducer;
