import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: [
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'node_modules/**',
      '.env*',
      'public/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts'
    ]
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,

      // React rules
      ...react.configs.recommended.rules,

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // React specific rules for Next.js
      'react/react-in-jsx-scope': 'off', // Not needed with Next.js JSX transform
      'react/prop-types': 'off', // Using TypeScript instead

      // General JavaScript/ES6+ rules
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true 
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',

      // Code style and formatting
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // React/JSX specific rules
      'jsx-quotes': ['error', 'prefer-double'],
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js specific considerations
      'no-html-link-for-pages': 'off', // Next.js handles this
      '@next/next/no-img-element': 'off' // Allow img elements alongside next/image
    }
  },
  {
    files: ['**/*.config.{js,mjs,ts}', '**/next.config.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
];