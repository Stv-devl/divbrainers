import React from 'react';
import { cn } from '../../../../lib/utils/cn';

interface AnswerOptionListProps {
  currentQuestion: string[];
  selectedAnswer: string | null;
  isCorrect: boolean;
  setIsCorrect: (value: boolean) => void;
  error: string;
  setSelectedAnswer: (answer: string) => void;
  setError: (error: string) => void;
}

const letters = ['A', 'B', 'C', 'D'] as const;

const AnswerOptionList: React.FC<AnswerOptionListProps> = ({
  currentQuestion,
  selectedAnswer,
  isCorrect,
  setIsCorrect,
  error,
  setSelectedAnswer,
  setError,
}) => {
  const getLiClass = (answer: string) =>
    cn(
      'flex items-center justify-between gap-3 p-3 bg-white rounded-lg shadow-sm transition-all',
      selectedAnswer === answer && isCorrect
        ? 'border-2 border-green-500'
        : selectedAnswer === answer && error
        ? 'border-2 border-red-500'
        : selectedAnswer === answer
        ? 'border border-blue-500'
        : 'border border-gray-300'
    );
  const getRadioClass = (answer: string) =>
    cn(
      'w-5 h-5 border-2 appearance-none cursor-pointer',
      selectedAnswer === answer && isCorrect
        ? 'border-green-500 bg-green-100'
        : selectedAnswer === answer && error
        ? 'border-red-500 bg-red-100'
        : 'border-gray-300 checked:border-blue-500 checked:bg-blue-200'
    );

  return (
    <ul className="space-y-4 w-full lg:w-[80%]">
      {currentQuestion.map((answer, index) => (
        <li key={index} className={getLiClass(answer)}>
          <label
            htmlFor={`answer-${index}`}
            className="flex items-center gap-3 flex-1 min-h-[40px] cursor-pointer"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm flex items-center justify-center shrink-0">
              {letters[index] ?? '?'}
            </div>
            <span>{answer}</span>
          </label>
          <input
            type="radio"
            name="answer"
            id={`answer-${index}`}
            value={answer}
            checked={selectedAnswer === answer}
            onChange={(e) => {
              setSelectedAnswer(e.target.value);
              setError('');
              setIsCorrect(false);
            }}
            className={getRadioClass(answer)}
          />
        </li>
      ))}
      {error && <span className="text-red-500">{error}</span>}
      {isCorrect && (
        <span className="text-green-600 font-medium">
          Congratulations, correct answer!
        </span>
      )}
    </ul>
  );
};

export default AnswerOptionList;
