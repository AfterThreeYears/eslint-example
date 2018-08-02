// var foo = 2;
//  ^ error: Avoid using variables named 'foo'
// In your tests:
var rule = require('../src/rules/test');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
ruleTester.run('my-rule', rule, {
  valid: ['bar', 'baz'],

  invalid: [
    {
      code: 'foo',
      errors: [
        {
          messageId: 'avoidName',
          data: {
            name: 'foo'
          }
        }
      ]
    }
  ]
});