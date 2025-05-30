import React from 'react';
import { FeedbackEntry } from '@/types/type';
import FeedbackContent from './FeedbackContent';
import FeedbackScoreCircle from './FeedBackScoreCircle';

interface ResumeFeedbackItemProps {
  item: FeedbackEntry;
  totalScore?: number;
}

/**
 * Component that displays a single feedback item with its content and score
 * @component
 * @param {ResumeFeedbackItemProps} props - The component props
 * @param {FeedbackEntry} props.item - The feedback entry to display
 * @param {number} [props.totalScore] - Optional total score to display instead of item score
 * @returns {JSX.Element} The rendered feedback item
 */
const ResumeFeedbackItem: React.FC<ResumeFeedbackItemProps> = ({
  item,
  totalScore,
}) => {
  console.log(item);

  const score = typeof totalScore === 'number' ? totalScore : item.score;

  return (
    <div className="border-b pb-6 border-gray-300 space-y-2">
      <h3 className="text-xl font-semibold text-blue-800">{item.label}</h3>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-2">
        <FeedbackContent item={item} />
        {typeof score === 'number' && (
          <div className="flex justify-center items-center w-[90px] h-[90px]">
            <FeedbackScoreCircle score={score} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeFeedbackItem;
