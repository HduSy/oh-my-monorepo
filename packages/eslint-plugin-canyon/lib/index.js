'use strict'

const requireIndex = require('requireindex')

module.exports = {
  rules: requireIndex(__dirname + '/rules'),
  configs: {
    ees6: {
      plugins: ['canyon'],
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
      },
      rules: {
        'canyon/func-nomore-three-params': 1,
      },
    },
  },
}
