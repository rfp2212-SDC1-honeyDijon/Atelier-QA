module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-console': [
      'error',
      {
        allow: [
          'error',
          'info',
          'clear'
        ]
      }
    ],
    'import/extensions': [
      'off'
    ]
  }
};
