import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin';
import destructuringPlugin from 'eslint-plugin-destructuring';
import importPlugin from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import importPath from 'eslint-plugin-no-relative-import-paths';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import { plugin as deprecatedTsPlugin, parser as tsParser } from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: { ...pluginJest.environments.globals.globals, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
      'no-relative-import-paths': importPath,
      destructuring: destructuringPlugin,
      '@stylistic': stylisticJs,
      deprecatedTs: deprecatedTsPlugin,
      jest: pluginJest,
      prettier,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      '@stylistic/ban-ts-comment': 'off',
      '@stylistic/no-base-to-string': 'off',
      '@stylistic/no-explicit-any': 'off',
      '@stylistic/no-floating-promises': 'off',
      '@stylistic/no-misused-promises': 'off',
      'deprecatedTs/no-non-null-assertion': 'error',
      '@stylistic/no-redundant-type-constituents': 'off',
      '@stylistic/no-shadow': 'off',
      '@stylistic/no-unsafe-enum-comparison': 'off',
      'deprecatedTs/no-unused-vars': 'warn',
      'deprecatedTs/no-use-before-define': 'warn',
      '@stylistic/restrict-template-expressions': 'off',
      'deprecatedTs/switch-exhaustiveness-check': 'error',
      'class-methods-use-this': 'off',
      'destructuring/in-methods-params': 'error',
      'destructuring/in-params': ['error', { 'max-params': 0 }],
      'eol-last': ['error', 'always'],
      'eslint-comments/no-unlimited-disable': 'off',
      'func-names': 'off',
      'import/extensions': 'off',
      'import/no-absolute-path': 'error',
      'import/no-extraneous-dependencies': 'off',
      'import/no-self-import': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
        },
      ],
      'import/prefer-default-export': 'off',
      'lines-between-class-members': ['error', 'always'],
      'max-classes-per-file': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-continue': ['off'],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: true, rootDir: 'src' },
      ],
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      '@stylistic/display-name': 'off',
      '@stylistic/function-component-definition': 'off',
      '@stylistic/no-array-index-key': 'off',
      '@stylistic/no-unstable-nested-components': 'off',
      '@stylistic/prop-types': 'off',
      '@stylistic/require-default-props': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 100,
          tabWidth: 2,
        },
      ],
    },
  },
];
