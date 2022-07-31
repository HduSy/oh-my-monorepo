/**
 * @fileoverview setTimeout 第二个参数必须为整数
 * @author songyao
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from 'eslint'
import rule from '../../../lib/rules/settimeout-correct-number'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  // 指定支持的语法
  parserOptions: {
    ecmaVersion: 6,
  },
})
ruleTester.run('settimeout-correct-number', rule, {
  valid: [
    // give me some code that won't trigger a warning
    'setTimeout(()=>console.log(0))',
    'setTimeout(()=>console.log(0), 0)',
    'setTimeout(()=>console.log(0), 1)',
  ],

  invalid: [
    {
      code: 'setTimeout(()=>console.log(0), -1.1)',
      errors: [
        {
          message: 'setTimeout 第二个参数必须为整数', // 与rule抛出的错误保持一致
          type: 'CallExpression', // rule监听的对应钩子
        },
      ],
    },
    {
      code: 'setTimeout(()=>console.log(0), 1.1)',
      errors: [
        {
          message: 'setTimeout 第二个参数必须为整数', // 与rule抛出的错误保持一致
          type: 'CallExpression', // rule监听的对应钩子
        },
      ],
    },
    {
      code: 'setTimeout(()=>console.log(0), "1.1")',
      errors: [
        {
          message: 'setTimeout 第二个参数必须为整数', // 与rule抛出的错误保持一致
          type: 'CallExpression', // rule监听的对应钩子
        },
      ],
    },
  ],
})
