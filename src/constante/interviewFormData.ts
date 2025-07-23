import { TFunction } from 'i18next';
import { DropdownOption } from '@/types/type';

export const getTranslatedOptionsPosition = (
  t: TFunction
): DropdownOption[] => [
  {
    label: t('interview.form.fields.position.options.front-end'),
    value: 'front-end',
  },
  {
    label: t('interview.form.fields.position.options.back-end'),
    value: 'back-end',
  },
  {
    label: t('interview.form.fields.position.options.full-stack'),
    value: 'full-stack',
  },
  {
    label: t('interview.form.fields.position.options.mobile'),
    value: 'mobile',
  },
  {
    label: t('interview.form.fields.position.options.devops'),
    value: 'devops',
  },
  {
    label: t('interview.form.fields.position.options.cloud-engineer'),
    value: 'cloud-engineer',
  },
  { label: t('interview.form.fields.position.options.qa'), value: 'qa' },
  {
    label: t('interview.form.fields.position.options.data-engineer'),
    value: 'data-engineer',
  },
  { label: t('interview.form.fields.position.options.ai-ml'), value: 'ai-ml' },
  {
    label: t('interview.form.fields.position.options.cyber-security'),
    value: 'cyber-security',
  },
  {
    label: t('interview.form.fields.position.options.ux-ui-designer'),
    value: 'ux-ui-designer',
  },
  {
    label: t('interview.form.fields.position.options.product-manager'),
    value: 'product-manager',
  },
  {
    label: t('interview.form.fields.position.options.tech-lead'),
    value: 'tech-lead',
  },
  {
    label: t('interview.form.fields.position.options.software-architect'),
    value: 'software-architect',
  },
];

export const getTranslatedOptionsDifficulty = (
  t: TFunction
): DropdownOption[] => [
  { label: t('Quiz.form.fields.difficulty.junior'), value: 'junior' },
  { label: t('Quiz.form.fields.difficulty.mid'), value: 'mid-level' },
  { label: t('Quiz.form.fields.difficulty.senior'), value: 'senior' },
];

export const getTranslatedOptionsInterviewType = (
  t: TFunction
): DropdownOption[] => [
  {
    label: t('interview.form.fields.interviewType.options.technical'),
    value: 'technical',
  },
  {
    label: t('interview.form.fields.interviewType.options.behavioral'),
    value: 'behavioral',
  },
  {
    label: t('interview.form.fields.interviewType.options.mixed'),
    value: 'mixed',
  },
];

const optionsNumberOfQuestions = [
  { label: '3', value: '3' },
  { label: '5', value: '5' },
  { label: '10', value: '10' },
];

export const getDropdowns = (t: TFunction) => [
  {
    name: 'position',
    label: t('interview.form.fields.position.label'),
    options: getTranslatedOptionsPosition(t),
    placeholder: t('interview.form.fields.position.placeholder'),
  },
  {
    name: 'difficulty',
    label: t('interview.form.fields.difficulty.label'),
    options: getTranslatedOptionsDifficulty(t),
    placeholder: t('interview.form.fields.difficulty.placeholder'),
  },
  {
    name: 'interviewType',
    label: t('interview.form.fields.interviewType.label'),
    options: getTranslatedOptionsInterviewType(t),
    placeholder: t('interview.form.fields.interviewType.placeholder'),
  },
  {
    name: 'numberOfQuestions',
    label: t('interview.form.fields.numberOfQuestions.label'),
    options: optionsNumberOfQuestions,
    placeholder: t('interview.form.fields.numberOfQuestions.placeholder'),
  },
];
