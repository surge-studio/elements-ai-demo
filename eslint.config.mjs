import harmony from 'eslint-config-harmony';

const config = {
  ...harmony,
  rules: {
    ...harmony.rules,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};

export default config;
