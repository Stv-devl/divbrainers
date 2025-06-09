import { DropdownOption } from '@/types/type';
import { InterviewSchemaType } from '../../lib/schema/interviewShema';

const optionsPosition = [
  { label: 'Front-End Developer', value: 'front-end' },
  { label: 'Back-End Developer', value: 'back-end' },
  { label: 'Full-Stack Developer', value: 'full-stack' },
  { label: 'Mobile Developer', value: 'mobile' },
  { label: 'DevOps Engineer', value: 'devops' },
  { label: 'Cloud Engineer', value: 'cloud-engineer' },
  { label: 'QA Engineer', value: 'qa' },
  { label: 'Data Engineer', value: 'data-engineer' },
  { label: 'AI/ML Engineer', value: 'ai-ml' },
  { label: 'Cybersecurity Engineer', value: 'cyber-security' },
  { label: 'UX/UI Designer', value: 'ux-ui-designer' },
  { label: 'Product Manager', value: 'product-manager' },
  { label: 'Tech Lead', value: 'tech-lead' },
  { label: 'Software Architect', value: 'software-architect' },
];

export const optionsDifficulty = [
  { label: 'Junior', value: 'junior' },
  { label: 'Mid-level', value: 'mid-level' },
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
