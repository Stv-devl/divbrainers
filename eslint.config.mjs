import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: ['eslint:recommended'],
  },
});
const eslintConfig = [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended'
  ),

  ...compat.config({
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      '@next/next/no-img-element': 'off',
      'prefer-const': 'warn',
      'no-var': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'tailwindcss/classnames-order': ['warn'],
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: true,
          named: false,
          warnOnUnassignedImports: false,
        },
      ],
    },
    overrides: [
      {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    ],
    ignorePatterns: ['.next/', 'tailwind.config.ts', 'next.config.js', '*.js'],
  }),
];
export default eslintConfig;
