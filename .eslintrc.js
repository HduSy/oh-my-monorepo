module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  env: {
    es6: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': [
      'off',
      {
        types: {
          // add a custom message to help explain why not to use it
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
  overrides: [
    {
      files: ['packages/eslint-plugin-canyon/tests/**/*.js'],
      env: { mocha: true },
    },
    {
      files: ['packages/eslint-plugin-canyon/lib/rules/*.js'],
      rules: {
        'eslint-plugin/prefer-message-ids': 'off',
        'eslint-plugin/require-meta-schema': 'off',
      },
    },
  ],
  globals: {
    module: 'readonly',
    require: 'readonly',
    __dirname: 'readonly',
  },
}
