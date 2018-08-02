/**
 * doc: example 导入模块 import bb, { cc } from './../xx.js' 不能使用两级以上的相对路径
 * output: import {{ specifiers }} from {{ raw }}
 */
const rule = require('../src/rules/no-relative');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, sourceType: 'module' } });
ruleTester.run('no-relative', rule, {
  valid: [
    'import bar from "foo/baz.ext";',
    'import bar from "./foo.js";',
    'import bar from "@/foo.js";',
    'import { lastName as surname } from "./profile.js";',
    'import { a } from "./xxx.js"',
    'import "lodash";',
    'import * as circle from "./circle";',
  ],
  invalid: [
    {
      code: 'import bb, { cc } from "./../xx.js";',
      errors: [
        {
          messageId: 'avoid',
          data: {
            specifiers: 'bb, { cc } from ',
            raw: '"./../xx.js"',
          }
        }
      ]
    },
    {
      code: 'import lodash from "./../../lodash";',
      errors: [
        {
          messageId: 'avoid',
          data: {
            specifiers: 'lodash from ',
            raw: '"./../../lodash"',
          }
        }
      ]
    },
    {
      code: 'import foo, { lastName as surname } from "./../profile.js"',
      errors: [
        {
          messageId: 'avoid',
          data: {
            specifiers: 'foo, { lastName as surname } from ',
            raw: '"./../profile.js"',
          }
        }
      ]
    },
    {
      code: 'import { aa } from "../../../xxx.js";',
      errors: [
        {
          messageId: 'avoid',
          data: {
            specifiers: '{ aa } from ',
            raw: '"../../../xxx.js"',
          }
        }
      ]
    },
    {
      code: 'import "../../lodash";',
      errors: [
        {
          messageId: 'avoid',
          data: {
            specifiers: '',
            raw: '"../../lodash"',
          }
        }
      ]
    },
    {
      code: 'import * as bar from "../foo";',
      errors: [
        {
          messageId: 'avoid',
          data: {
            specifiers: '* as bar from ',
            raw: '"../foo"',
          }
        }
      ]
    }
  ]
});
