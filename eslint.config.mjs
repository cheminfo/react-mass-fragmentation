import cheminfoReact from 'eslint-config-cheminfo-react';
import cheminfoTypescript from 'eslint-config-cheminfo-typescript';
import globals from 'globals';

export default [
  ...cheminfoReact,
  ...cheminfoTypescript,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
    }
  }
]