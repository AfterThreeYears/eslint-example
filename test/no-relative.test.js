// var foo = 2;
//  ^ error: Avoid using variables named 'foo'
// In your tests:
var rule = require('../src/rules/no-relative');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, sourceType: 'module' }, });
ruleTester.run('my-rule', rule, {
  valid: [
    'import a from "a.js";',
  ],

  invalid: [
    {
      code: 'import b from "./../b.js";',
      errors: [
        {
          messageId: 'avoid',
          data: {
            specifiers: 'bb, { cc }',
            raw: '"./../xx.js"',
          }
        }
      ]
    }
  ]
});

// 导入模块 import bb, { cc } from './../xx.js' 不能使用两级以上的相对路径
// import {{ specifiers }} from {{ raw }}