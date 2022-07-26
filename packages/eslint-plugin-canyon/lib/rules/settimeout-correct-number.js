/**
 * @fileoverview setTimeout 第二个参数必须为整数
 * @author songyao
 */
"use strict";

module.exports = {
  meta: {
    type: `problem`, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "setTimeout 第二个参数必须为整数",
    },
    fixable: null, // Or `code` or `whitespace`
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      'CallExpression': (node) => {
        if(node.callee.name!=='setTimeout') return // 不是定时器即过滤
        const timeNode = node.arguments&&node.arguments[1] // 取第二个参数
        if(!timeNode) return // 不存在
        if(timeNode.type==='Literal'&&!(/^\d+$/.test(timeNode.value))||timeNode.type === 'UnaryExpression'&&timeNode.operator !== '+'){
          // 报告问题代码 https://cn.eslint.org/docs/developer-guide/working-with-rules#the-context-object
          context.report({
            node,
            message: 'setTimeout 第二个参数必须为整数'
          })
        }
      }
    };
  },
};