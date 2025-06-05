import React from 'react';
import Button from '@/components/ui/buttons/Button';
import { iconsMap } from '@/constante/iconsMap';

interface LiveQuizControlProps {
  handleValidate: () => void;
  handleNewQuestion: () => void;
  isCorrect: boolean;
}

const LiveQuizControl: React.FC<LiveQuizControlProps> = ({
  handleValidate,
  handleNewQuestion,
  isCorrect,
}) => {
  return (
    <div className="flex gap-4 justify-end">
      <div className="w-44 h-10 mb-5 sm:mb-8 text-sm">
        <Button
          label="Reload"
          type="button"
          color="empty"
          onClick={handleNewQuestion}
          IconComponent={iconsMap.IconReload}
        />
      </div>
      <div className="w-44 h-10 mb-5 sm:mb-8">
        <Button
          label={isCorrect ? 'Next' : 'Validate'}
          type="button"
          color="filled"
          onClick={isCorrect ? handleNewQuestion : handleValidate}
        />
      </div>
    </div>
  );
};

export default LiveQuizControl;
