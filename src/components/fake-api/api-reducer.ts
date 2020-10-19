import { ApiStateType, ApiReducerAction } from '../../types/api-types';

const ApiReducer = (state: ApiStateType, action: ApiReducerAction) => {
  switch (action.type) {
    case 'ADD_ITEMS_TO_GROUP':
      return {
        ...state,
      };
    case 'REMOVE_ITEMS_FROM_GROUP':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ApiReducer;
