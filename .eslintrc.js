module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    strict: 0,
    // dynamic require is needed for recursive merging in app/config
    'import/no-dynamic-require': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'camelcase': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'import/newline-after-import': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    'no-undef': 'off',
    'no-confusing-arrow': 'off',
  },
};
