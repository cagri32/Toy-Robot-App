module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    // You can extend your shared config here or put overrides below
  ],
  overrides: [
    {
      files: ['apps/backend/**/*.ts', 'apps/backend/**/*.tsx'],
      parserOptions: {
        project: './apps/backend/tsconfig.json',
      },
      // backend specific rules and plugins
    },
    {
      files: ['apps/frontend/**/*.ts', 'apps/frontend/**/*.tsx', 'apps/frontend/**/*.js', 'apps/frontend/**/*.jsx'],
      parserOptions: {
        project: './apps/frontend/tsconfig.json',
      },
      // frontend specific rules and plugins
    },
  ],
};
