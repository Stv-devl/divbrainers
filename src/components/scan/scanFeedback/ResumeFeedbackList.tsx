import { log } from 'node:console';
import React from 'react';
import { FeedbackEntry } from '@/types/type';
import ResumeFeedbackItem from './ResumeFeedbackItem';

interface Props {
  feedback: FeedbackEntry[];
}

/**
 * Component that displays a list of feedback items with special handling for summary and total scores
 * @component
 * @param {Props} props - The component props
 * @param {FeedbackEntry[]} props.feedback - Array of feedback entries to display
 * @returns {JSX.Element} The rendered feedback list
 */
const ResumeFeedbackList: React.FC<Props> = ({ feedback }) => {
  const total = feedback.find((i) => i.key === 'total');

  console.log(feedback);

  return (
    <div className="space-y-6">
      {feedback.map((item) => {
        if (item.key === 'summary') {
          return (
            <ResumeFeedbackItem
              key="summary"
              item={item}
              totalScore={total?.score}
            />
          );
        }
        if (item.key === 'total') return null;
        return <ResumeFeedbackItem key={item.key} item={item} />;
      })}
    </div>
  );
};

export default ResumeFeedbackList;
