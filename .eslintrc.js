const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    'prettier/prettier': 'error',
    'prefer-const': 'off',
    'no-useless-return': 'off',
    'no-useless-escape': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always', // new line between groups
        groups: [
          '/^node:*/',
          'module',
          // tsoconfig shortcuts
          `/^(${Object.keys(compilerOptions.paths)
            .map((path) => path.split('/*')[0])
            .join('|')})/`,
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
