import { TFunction } from 'i18next';
import React from 'react';
import Button from '@/components/ui/buttons/Button';
import { iconsMap } from '@/constante/iconsMap';

interface LiveQuizControlProps {
  handleValidate: () => void;
  handleNewQuestion: () => void;
  isCorrect: boolean;
  t: TFunction;
}

/**
 * Component that renders the control buttons for the live quiz
 * @component
 * @param {LiveQuizControlProps} props - Component props
 * @param {() => void} props.handleValidate - Function to validate the current answer
 * @param {() => void} props.handleNewQuestion - Function to load a new question
 * @param {boolean} props.isCorrect - Flag indicating if the current answer is correct
 * @returns {JSX.Element} The rendered control buttons
 */
const LiveQuizControl: React.FC<LiveQuizControlProps> = ({
  handleValidate,
  handleNewQuestion,
  isCorrect,
  t,
}) => {
  return (
    <div className="flex gap-4 justify-end">
      <div className="w-44 h-10 mb-5 sm:mb-8 text-sm">
        <Button
          label={t('Quiz.liveQuiz.buttonReload')}
          type="button"
          color="empty"
          onClick={handleNewQuestion}
          IconComponent={iconsMap.IconReload}
        />
      </div>
      <div className="w-44 h-10 mb-5 sm:mb-8">
        <Button
          label={
            isCorrect
              ? t('Quiz.liveQuiz.buttonNext')
              : t('Quiz.liveQuiz.buttonValidate')
          }
          type="button"
          color="filled"
          onClick={isCorrect ? handleNewQuestion : handleValidate}
        />
      </div>
    </div>
  );
};

export default LiveQuizControl;
