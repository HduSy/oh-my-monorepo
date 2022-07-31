/**
 * @fileoverview Number of function&#39;s params shouldn&#39;t be 3 more.
 * @author songyao
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from 'eslint'
import rule from '../../../lib/rules/func-nomore-three-params'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('func-nomore-three-params', rule, {
  valid: [
    // give me some code that won't trigger a warning
    'function test(a, b, c) {}',
  ],

  invalid: [
    {
      code: 'function test(a, b, c, d) {}',
      errors: [
        {
          message: '非箭头函数参数最多不能超过3个',
          type: 'FunctionDeclaration',
        },
      ],
    },
  ],
})
