module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'linebreak-style': 0,
    'react/jsx-one-expression-per-line': ['off'],
  },
};
