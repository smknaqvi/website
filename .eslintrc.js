module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint', 'prettier', 'graphql'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./gql-schema.json'),
      },
    ],
    'prefer-const': 2,
    'no-console': 1,
  },
  ignorePatterns: ['node_modules', 'dist', 'media'],
};
