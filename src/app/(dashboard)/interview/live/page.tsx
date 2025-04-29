import React from 'react';
import LiveInterviewUI from '@/components/interview/liveInterview/LiveInterviewUi';
import { getUser } from '../../../../../lib/actions/user/getUser';

//check if user has started the interview

const Page = async () => {
  const user = await getUser();
  if (!user) return;

  return <LiveInterviewUI user={user} />;
};

export default Page;
