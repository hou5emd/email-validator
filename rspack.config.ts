import { defineConfig } from '@rspack/cli';
import path from 'path'

const config = defineConfig({
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    tsConfig: path.resolve(__dirname, './tsconfig.json'),
    extensions: ['.ts']
  },
  module: {
    rules: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
          type: 'javascript/auto',
        },
      ]
  }
});
module.exports = config;