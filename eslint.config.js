import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import jest from 'eslint-plugin-jest'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // ecmaVersion: 2020,
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      jest,
    },
    settings: {
      react: {
        version: 'detect', // 👈 Fixes the warning
      },
    },
    rules: {
      ...react.configs['recommended'].rules,
      ...reactHooks.configs['recommended-latest'].rules,
      ...jest.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // if using React 17+

      // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-unused-vars': 'warn',
      'react-refresh/only-export-components': 'off', // 'warn', // or 'error'
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
])
