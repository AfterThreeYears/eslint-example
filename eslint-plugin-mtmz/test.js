
module.exports = {
  meta: {
      docs: {
          description: "disallow unnecessary semicolons",
          category: "Possible Errors",
          recommended: true,
          url: "https://eslint.org/docs/rules/no-extra-semi"
      },
      fixable: "code",
      schema: [] // no options
  },
  create: function(context) {
      return {
          'ImportDeclaration': function(node) {
              const { value } = node.source;
              if (value.includes('../')) {
                  const { raw } = node.source;
                  const specifiers = node.specifiers.map(specifier => {
                    const name = specifier.local.name;
                    if ( specifier.type === 'ImportDefaultSpecifier') return name;
                    if ( specifier.type === 'ImportSpecifier' ) return `{ ${name} }`;
                  }).join(', ');
                context.report({
                  node: node,
                  message: "导入模块 import {{ specifiers }} from {{ raw }} 不能使用两级以上的相对路径",
                  data: {
                    specifiers,
                    raw,
                  }
                })
              }
            // at a ReturnStatement node while going down
        },
      };
  }
};