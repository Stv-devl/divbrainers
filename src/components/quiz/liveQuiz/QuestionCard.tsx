import { TFunction } from 'i18next';
import Image from 'next/image';
import React from 'react';

interface QuestionCardProps {
  currentQuestion: string;
  t: TFunction;
}

/**
 * Component that displays a question card with a recruiter avatar and question text
 * @component
 * @param {QuestionCardProps} props - Component props
 * @param {string} props.currentQuestion - The question text to display
 * @returns {JSX.Element} The rendered question card
 */
const QuestionCard: React.FC<QuestionCardProps> = ({ currentQuestion, t }) => {
  return (
    <div className="relative w-full bg-white shadow-sm border border-gray-300 rounded-lg">
      <div className="flex items-center gap-4 p-5 h-[85px] bg-gray-100 rounded-t-lg">
        <Image
          src="/images/recruiter.png"
          alt="recruiter"
          width={60}
          height={60}
          className="ml-0 sm:ml-5 w-[60px] h-[60px] object-cover rounded-full border-2 border-blue-800"
          priority
        />
        <h3 className="text-lg font-bold">{t('Quiz.liveQuiz.interviewer')}</h3>
      </div>
      <div className="px-5 py-6 sm:px-6 sm:py-6">
        <p>{currentQuestion}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-2 h-full bg-blue-500 rounded-l-lg" />
    </div>
  );
};

export default QuestionCard;
