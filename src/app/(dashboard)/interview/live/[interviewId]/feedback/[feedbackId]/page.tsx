import { notFound } from 'next/navigation';
import FeedBackUi from '@/components/interview/feedBackInterview/FeedBackUi';
import { getFeedbackById } from '../../../../../../../../lib/serveur/getFeedbackById';
import { getInterviewById } from '../../../../../../../../lib/serveur/getInterviewById';

interface PageProps {
  params: Promise<{ interviewId: string; feedbackId: string }>;
}

/**
 * Page component for displaying feedback for an interview
 * @param params - The parameters of the page
 * @returns The page component
 */
export default async function Page({ params }: PageProps) {
  const { interviewId, feedbackId } = await params;

  if (!interviewId || !feedbackId) notFound();

  const interview = await getInterviewById(interviewId);
  const feedback = await getFeedbackById(feedbackId);

  if (!interview || !feedback) return notFound();

  const { position } = interview;
  const { strengths, areasForImprovement, finalAssessment, totalScore } =
    feedback;

  return (
    <div className=" relative flex size-full flex-col gap-2 sm:gap-6 bg-white p-0 sm:max-w-[1950px] sm:px-18 sm:py-12 sm:shadow-md">
      <FeedBackUi
        strengths={strengths}
        areasForImprovement={areasForImprovement}
        finalAssessment={finalAssessment}
        totalScore={totalScore}
        position={position}
      />
    </div>
  );
}
