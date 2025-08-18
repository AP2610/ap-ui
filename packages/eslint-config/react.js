import baseConfig from './base.js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

const { rules: baseRules, ...baseConfigWithoutRules } = baseConfig;

const reactLibraryConfig = [
  ...baseConfigWithoutRules,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...baseRules,
      'react/prop-types': 'off',
      'react/jsx-no-leaked-render': 'error', // Prevents conditional rendering bugs
      'react/jsx-key': 'error', // Ensures proper keys in lists
      'react/no-array-index-key': 'warn', // Discourages array index as keys
      'react/react-in-jsx-scope': 'off',

      // Accessibility enforcement (from your A11y baseline)
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',

      // Component library specific rules
      'react/no-unescaped-entities': 'off',

      // Import/export rules for your subpath export pattern
      'import/no-default-export': 'error', // Enforce named exports only
      'import/prefer-default-export': 'off', // Allow named exports
    },
  },
];

export default reactLibraryConfig;
