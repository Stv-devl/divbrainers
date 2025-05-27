import React from 'react';
import { FeedbackEntry } from '@/types/type';

interface FeedbackContentProps {
  item: FeedbackEntry;
}

/**
 * Component that displays the content of a feedback entry
 * @component
 * @param {FeedbackContentProps} props - The component props
 * @returns {JSX.Element} The rendered feedback content
 */

const FeedbackContent: React.FC<FeedbackContentProps> = ({ item }) => {
  return (
    <div className="w-2/3 whitespace-pre-line">
      {item.comment && <p>{item.comment}</p>}
      {item.text && <p>{item.text}</p>}
      {item.items && (
        <ul className="list-disc list-inside mt-1">
          {item.items.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackContent;
