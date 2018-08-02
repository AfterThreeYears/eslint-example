// /Users/wangjingcheng/wbb/git/github/eslint-example/src/rules/no-relative.js
module.exports = {
  meta: {
    docs: {
      // 描述
      description: 'disallow the relative path of more than two',
      // 类型
      category: 'Possible Errors',
      // 是否推荐
      recommended: true,
      url: 'https://eslint.org/docs/rules/no-extra-semi'
    },
    fixable: 'whitespace', // enum ['whitespace', 'code']
    schema: [], // no options
    message: {
      avoid: '导入模块 import "{{ specifiers }}" from "{{ raw }}" 不能使用两级以上的相对路径',
    }
  },
  create: function (context) {
    // let message = context.options[0];
    return {
      'ImportDeclaration': function (node) {
        debugger;
        const { value } = node.source;
        console.log('ashdkjahsdkjahkdj', value.includes('../'));
        if (!value.includes('../')) return;
        const { raw } = node.source;
        const specifiers = node.specifiers.map(specifier => {
          const name = specifier.local.name;
          if (specifier.type === 'ImportDefaultSpecifier') return name;
          if (specifier.type === 'ImportSpecifier') return `{ ${name} }`;
        }).join(', ');
        console.log('asdjaslkdjalskdjalksd')
        context.report({
          node: node,
          messageId: 'avoid',
          data: {
            specifiers,
            raw,
          }
        });
      },
    };
  }
};