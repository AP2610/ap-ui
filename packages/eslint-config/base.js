import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import typescript from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This allows using older plugin configurations with the new ESLint flat config system
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseConfig = [
  // Extend recommended configurations from TypeScript ESLint and Prettier plugins
  ...compat.extends('plugin:@typescript-eslint/recommended', 'plugin:turbo/recommended', 'plugin:prettier/recommended'),
  {
    languageOptions: {
      parser: typescript, // Use TypeScript parser instead of default JavaScript parser
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module', // Treat files as ES modules (allows import/export)
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn', // For immutable props
    },
    // Has to come last to override other conflicting rules
    ...eslintConfigPrettier,
  },
];

export default baseConfig;
