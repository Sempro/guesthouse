module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'script',
  },
  plugins: [
    'import',
  ],
  rules: {
    'no-console': 'off'
  },
  env: {
    browser: true,
    node: true,
  }
};
