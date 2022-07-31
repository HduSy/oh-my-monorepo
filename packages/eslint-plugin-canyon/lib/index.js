'use strict'

import requireIndex from 'requireindex'

export const configs = {
  ees6: {
    plugins: ['canyon'],
    env: ['es6'],
    rules: {
      'canyon/func-nomore-three-params': 'error',
    },
  },
}
export const rules = requireIndex(__dirname + '/rules')
