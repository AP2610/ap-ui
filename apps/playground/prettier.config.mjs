import rootConfig from '../../prettier.config.mjs';

const prettierConfig = {
  ...rootConfig,
  tailwindStylesheet: './src/styles/globals.css',
};

export default prettierConfig;
