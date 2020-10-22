import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackLinkLayout from '../components/layout/backlink-layout';
import GroupView from '../components/group-view';
import getItemGroup from '../support/hooks/get-item-group';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Group: Page = () => {
  const router = useRouter();
  console.log(router.query);

  const title: string = `Grupp`;
  // NOTE this number conversion does not guard against multiple group-ids being entered.
  // however, inserting NaN, 0, undefined just results in an empty group.
  const group = getItemGroup(Number(router.query?.groupId));
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
        group={group}
        openOnEdit={router.query?.edit === 'true' || !group.groupId}
        itemIdsToAdd={itemIdsToAdd}
      />
    </>
  );
};

Group.Layout = BackLinkLayout;

export default Group;
