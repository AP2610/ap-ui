import tseslint from 'typescript-eslint';
import globals from 'globals';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginStorybook from 'eslint-plugin-storybook';
import baseConfig from './base.js';

const storybookConfig = [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      storybook: pluginStorybook,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...pluginReactHooks.configs['recommended-latest'].rules,
      ...pluginReactRefresh.configs.vite.rules,
      ...pluginStorybook.configs.recommended.rules,
    },
  },
];

export default storybookConfig;
