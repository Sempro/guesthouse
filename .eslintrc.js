module.exports = {
  extends: 'airbnb-base',
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
