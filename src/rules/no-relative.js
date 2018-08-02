function WrapImportDeclaration(context, reg) {
  return function ImportDeclaration(node) {
    const { value } = node.source;
    if (!reg.test(value)) return;
    const { raw } = node.source;
    let specifiers = node.specifiers.map(specifier => {
      const entityName = specifier.local.name;
      const alias = (specifier.imported || {}).name;
      if (specifier.type === 'ImportDefaultSpecifier') return entityName;
      if (specifier.type === 'ImportSpecifier' && alias && alias !== entityName) {
        return `{ ${alias} as ${entityName} }`;
      }
      if (specifier.type === 'ImportSpecifier') {
        return `{ ${entityName} }`;
      }
      if (specifier.type === 'ImportNamespaceSpecifier') {
        return `* as ${entityName}`;
      }
    }).join(', ');
    if (specifiers) specifiers = `${specifiers} from `;
    context.report({
      node: node,
      messageId: 'avoid',
      data: {
        specifiers,
        raw,
      }
    });
  };
}
module.exports = {
  meta: {
    docs: {
      // 描述
      description: 'disallow the relative path of more than two',
      // 类型
      category: 'Possible Errors',
      // 是否推荐
      recommended: true,
      url: 'https://eslint.org/docs/rules/no-relative',
    },
    fixable: 'whitespace', // enum ['whitespace', 'code']
    schema: [], // no options
    messages: {
      avoid: '导入模块 import {{ specifiers }}{{ raw }} 不能使用两级以上的相对路径',
    }
  },
  create: function (context) {
    const reg = context.options[0] || /\/?\.\.\//;
    return {
      ImportDeclaration: WrapImportDeclaration(context, reg),
    };
  }
};