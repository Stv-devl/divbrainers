import { InputFieldProps } from '@/types/componantsType';

export const navItems = [
  { path: '/home', type: 'Home' },
  { path: '/quizz', type: 'Quizz' },
  { path: '/coding', type: 'Coding' },
  { path: '/interview', type: 'Interview' },
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
