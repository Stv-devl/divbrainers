import React from 'react';

interface FeedbackScoreCircleProps {
  score: number;
}

/**
 * Determines the color based on the score value
 * @param {number} score - The score value
 * @returns {string} The color hex code
 */
const getColor = (score: number) => {
  if (score < 8) return '#ef4444';
  if (score < 14) return '#f97316';
  return '#22c55e';
};

/**
 * Component that displays a circular progress indicator for feedback scores
 * @component
 * @param {FeedbackScoreCircleProps} props - The component props
 * @param {number} props.score - The score value to display (out of 20)
 * @returns {JSX.Element} The rendered circular score indicator
 */
const FeedbackScoreCircle: React.FC<FeedbackScoreCircleProps> = ({ score }) => {
  const radius = 32;
  const strokeWidth = 14;
  const size = radius * 2 + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = (score / 20) * 100;
  const offset = circumference - (percentage / 100) * circumference;
  const color = getColor(score);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#1f2937"
        fontSize="16"
        fontWeight="bold"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      >
        {score}/20
      </text>
    </svg>
  );
};

export default FeedbackScoreCircle;
