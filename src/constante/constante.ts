import { InputFieldProps } from '@/types/type';

export const navItems = [
  { path: '/home', type: 'nav.home', icon: 'IconHome' },
  { path: '/quiz', type: 'nav.quiz', icon: 'IconQuiz' },
  { path: '/coding', type: 'nav.coding', icon: 'IconCode' },
  { path: '/interview', type: 'nav.interview', icon: 'IconInterview' },
  { path: '/scan', type: 'nav.ats', icon: 'IconScan' },
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
    title: 'features.quiz.title',
    description: 'features.quiz.description',
  },
  {
    icon: 'IconCode',
    title: 'features.coding.title',
    description: 'features.coding.description',
  },
  {
    icon: 'IconIa',
    title: 'features.ai.title',
    description: 'features.ai.description',
  },
  {
    icon: 'IconSats',
    title: 'features.stats.title',
    description: 'features.stats.description',
  },
  {
    icon: 'IconScan',
    title: 'features.ats.title',
    description: 'features.ats.description',
  },
];
