module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // Recommended ts/es-lint rules
    'plugin:@typescript-eslint/recommended',
    // Disable ESLint rules conflicting with Prettier
    'prettier/@typescript-eslint',
    // Displays Prettier  errors as ESLint errors - must be last plugin in 'extends' array
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
};
