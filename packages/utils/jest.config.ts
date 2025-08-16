import config from '@ap/jest-config';

const utilsConfig = {
  ...config,
  setupFilesAfterEnv: ['@ap/jest-config/setup'],
};

export default utilsConfig;
