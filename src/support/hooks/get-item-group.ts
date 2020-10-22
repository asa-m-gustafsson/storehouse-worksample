import { useState, useContext, useEffect } from 'react';
import { GroupType } from '../../types/item-types';
import { ApiContext } from '../fake-api/api-context';
import { extractSingleGroupFromState } from '../fake-api/api-converters';

const getItemGroup = (groupId: number) => {
  const { state, dispatch } = useContext(ApiContext);
  const [itemGroup, setItemGroup] = useState<GroupType>({
    groupId: 0,
    name: '',
    items: [],
  });

  useEffect(() => {
    console.log('getItemGroup hook called');
    if (groupId) {
      setItemGroup(extractSingleGroupFromState(state, groupId));
    }
  }, []);

  return itemGroup;
};

export default getItemGroup;
