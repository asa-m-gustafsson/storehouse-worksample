import React, { useState, useContext, useEffect } from 'react';
import '../styles/group-view.less';

const GroupView = ({
  groupId,
  openOnEdit,
  itemIdsToAdd,
}: {
  groupId: number;
  openOnEdit: boolean;
  itemIdsToAdd: number[];
}) => {
  return (
    <>
      <div className="c-group-info"></div>
      <div className="c-group-contents"></div>
    </>
  );
};

export default GroupView;
