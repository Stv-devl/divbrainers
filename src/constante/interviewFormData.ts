import { DropdownOption } from '@/types/type';
import { InterviewSchemaType } from '../../lib/schema/interviewShema';

const optionsPosition = [
  { label: 'Front-end', value: 'frontend' },
  { label: 'Back-end', value: 'backend' },
  { label: 'Full-stack', value: 'fullstack' },
];

const optionsDifficulty = [
  { label: 'Junior', value: 'junior' },
  { label: 'Mid', value: 'mid' },
  { label: 'Senior', value: 'senior' },
];

const optionsInterviewType = [
  { label: 'Technical', value: 'technical' },
  { label: 'Behavioral', value: 'behavioral' },
  { label: 'Mixed', value: 'mixed' },
];

const optionsNumberOfQuestions = [
  { label: '3', value: '3' },
  { label: '5', value: '5' },
  { label: '10', value: '10' },
];

export const optionsAddYourStack = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'TypeScript', value: 'typescript' },
];

export const dropdowns: {
  name: keyof InterviewSchemaType;
  label: string;
  options: DropdownOption[];
}[] = [
  { name: 'position', label: 'Position', options: optionsPosition },
  { name: 'difficulty', label: 'Difficulty', options: optionsDifficulty },
  {
    name: 'interviewType',
    label: 'Interview type',
    options: optionsInterviewType,
  },
  {
    name: 'numberOfQuestions',
    label: 'Number of questions',
    options: optionsNumberOfQuestions,
  },
];
