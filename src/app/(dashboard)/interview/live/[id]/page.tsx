'use server';

import { notFound } from 'next/navigation';
import LiveInterviewUI from '@/components/interview/liveInterview/LiveInterviewUi';
import { getInterviewById } from '../../../../../../lib/actions/interviews/getInterviewById';
import { getUser } from '../../../../../../lib/actions/user/getUser';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const user = await getUser();
  const interview = await getInterviewById(id);

  if (!user || !interview) {
    notFound();
  }

  return <LiveInterviewUI user={user} interview={interview} />;
}
