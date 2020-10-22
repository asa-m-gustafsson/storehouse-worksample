import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BackLinkLayout from '../components/layout/backlink-layout';
import GroupView from '../components/group-view';
import getItemGroupWithCandidates from '../support/hooks/get-item-group-with-candidates';

type Page = NextPage & {
  Layout?: (props: { children?: ReactNode }) => JSX.Element;
};

const Group: Page = () => {
  const router = useRouter();
  const title: string = `Gruppvy`;
  // NOTE this number conversion does not guard against multiple group-ids being entered.
  // however, inserting NaN, 0, undefined just results in an empty group.
  const groupId = Number(router.query?.groupId);
  const itemIdsToAdd = (router.query?.itemIdsToAdd
    ? Array.isArray(router.query.itemIdsToAdd)
      ? router.query.itemIdsToAdd
      : [router.query.itemIdsToAdd]
    : []
  ).map((id) => {
    return Number.parseInt(id);
  });
  const { group, candidates } = getItemGroupWithCandidates(
    groupId,
    itemIdsToAdd[0] ?? 0
  );
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GroupView
        group={group}
        candidates={candidates}
        openOnEdit={router.query?.edit === 'true' || !groupId}
        itemIdsToAdd={itemIdsToAdd}
      />
    </>
  );
};

Group.Layout = BackLinkLayout;

export default Group;
