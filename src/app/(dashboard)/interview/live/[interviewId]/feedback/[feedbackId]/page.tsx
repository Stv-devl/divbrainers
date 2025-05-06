import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/buttons/BackButton';
import { getFeedbackById } from '../../../../../../../../lib/actions/feedback/getFeedbackById';
import { getInterviewById } from '../../../../../../../../lib/actions/interviews/getInterviewById';
import FeedbackSection from '../../../../../../../components/interview/feedBackInterview/FeedBackSection';

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
      <h1 className="text-3xl font-bold text-blue-800 mb-6 border-b border-blue-800 pb-4">
        Feedback for {position}
      </h1>

      <FeedbackSection title="Strengths:" content={strengths} />
      <FeedbackSection
        title="Areas for Improvement:"
        content={areasForImprovement}
      />
      <FeedbackSection title="Final Assessment:" content={finalAssessment} />

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 ml-auto">
        <span className="w-full text-center text-2xl font-bold text-blue-800">
          {`${totalScore}/20`}
        </span>
      </div>
      <BackButton
        route="/interview"
        position="-top-9 sm:top-3 sm:left-3 left-0 "
      />
    </div>
  );
}
