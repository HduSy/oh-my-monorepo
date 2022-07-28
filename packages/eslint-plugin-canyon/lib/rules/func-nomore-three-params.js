module.exports = {
  meta: {
    type: `problem`, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Number of function's params shouldn't be 3 more.",
    },
  },

  create(context) {
    return {
      // visitor functions for different types of nodes
      FunctionDeclaration: (node) => {
        if(node.params.length > 3) {
          context.report({
            node,
            message: '非箭头函数参数最多不能超过3个'
          })
        }
      }
    };
  },
};
