module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json', // Add this line to point ESLint to your tsconfig.json
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/prop-types': 'off', // Turn off prop-types rule for TypeScript
    },
  };
  