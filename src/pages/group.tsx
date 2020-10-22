import React, { ReactNode, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackLinkLayout from '../components/layout/backlink-layout';
import {
  ItemListForOverview,
  ItemType,
  GroupType,
  GenericListType,
  ListEntryIsItem,
  GetTotalItemAmountForGroup,
  GetTotalItemAmountForList,
} from '../types/item-types';
import GroupView from '../components/group-view';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Group: Page = () => {
  const router = useRouter();
  console.log(router.query);

  const title: string = `Grupp`;
  // NOTE this does not guard against multiple group-ids being entered.
  const groupId = Number(router.query?.groupId);

  const itemIdsToAdd = (router.query?.itemIdsToAdd
    ? Array.isArray(router.query.itemIdsToAdd)
      ? router.query.itemIdsToAdd
      : [router.query.itemIdsToAdd]
    : []
  ).map((id) => {
    return Number.parseInt(id);
  });
  console.log(itemIdsToAdd);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GroupView
        groupId={groupId}
        openOnEdit={router.query?.edit === 'true'}
        itemIdsToAdd={itemIdsToAdd}
      />
    </>
  );
};

Group.Layout = BackLinkLayout;

export default Group;
