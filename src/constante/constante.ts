import { InputFieldProps } from '@/types/type';

export const navItems = [
  { path: '/home', type: 'Home', icon: 'IconHome' },
  { path: '/quiz', type: 'Quiz', icon: 'IconQuiz' },
  { path: '/coding', type: 'Coding', icon: 'IconCode' },
  { path: '/interview', type: 'Interview', icon: 'IconInterview' },
  { path: '/scan', type: 'ATS scan', icon: 'IconScan' },
];

export const inputFields: InputFieldProps[] = [
  {
    name: 'name',
    label: 'Username : ',
    placeholder: 'e.g. Appleseed',
    autoComplete: 'username',
  },
  {
    name: 'email',
    label: 'Email : ',
    placeholder: 'e.g. alex@email.com',
    autoComplete: 'email',
  },
];
export const features = [
  {
    icon: 'IconBrain',
    title: 'Quiz',
    description:
      'Challenge yourself with quizzes built to match your technical stack and experience level.',
  },
  {
    icon: 'IconCode',
    title: 'Coding live',
    description:
      'Live coding through our console, with technical questions to train in real conditions.',
  },
  {
    icon: 'IconIa',
    title: 'AI Interviews',
    description:
      'Be ready for job interviews with AI-simulated interviews to get you in the right mindset.',
  },
  {
    icon: 'IconSats',
    title: 'Statistics',
    description:
      'Track your progress over time with detailed performance stats and insightful visualizations.',
  },
];
