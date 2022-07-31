'use strict'

const requireIndex = require('requireindex')

module.exports = {
  ees6: {
    plugins: ['canyon'],
    env: ['es6'],
    rules: {
      'canyon/func-nomore-three-params': 'error',
    },
  },
  rules: requireIndex(__dirname + '/rules'),
}
