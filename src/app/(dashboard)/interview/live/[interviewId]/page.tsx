'use server';

import { notFound } from 'next/navigation';
import LiveInterviewUI from '@/components/interview/liveInterview/LiveInterviewUi';
import { getInterviewById } from '../../../../../../lib/actions/interviews/getInterviewById';
import { getUser } from '../../../../../../lib/actions/user/getUser';

interface PageProps {
  params: Promise<{ interviewId: string }>;
}

/**
 * Page component for displaying a live interview
 * @param params - The parameters of the page
 * @returns The page component
 */
export default async function Page({ params }: PageProps) {
  const { interviewId } = await params;

  if (!interviewId) notFound();

  const user = await getUser();
  const interview = await getInterviewById(interviewId);

  if (!user || !interview) {
    notFound();
  }

  return <LiveInterviewUI user={user} interview={interview} />;
}
