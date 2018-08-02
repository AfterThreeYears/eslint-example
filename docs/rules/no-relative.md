
## NO-RELATIVE
### Rule name: `no-relative`

#### Rule Details
总是在webpack或者其他构建工具中配置alias, 而不是使用多层级的相对路径

👌GOOD
```javascript
import bar from 'foo/baz.ext';,
import bar from './foo.js';,
import bar from '@/foo.js';,
import { lastName as surname } from './profile.js';,
import { a } from './xxx.js',
import 'lodash';,
import * as circle from './circle';,
```

😢BAD
```javascript
import a from '../a.js';
import bb, { cc } from './../../../../xx.js';
import e from './.e.js';
import lodash from 'lodash';
import foo, { lastName as surname } from '../profile.js';
import { aa } from '../../../xxx.js';
import '../../lodash';
import * as circle from '../circle';
```
### 错误提示

#### vscode
  - <img src="//meipu1.video.meipai.com/9a086867-ddfa-48b7-91f7-fc88d7f55f86.png" width="800px" />

#### cli
- <img  src="//meipu1.video.meipai.com/9ddfae12-9404-4439-9c5f-80cd367555fe.png" width="800px" />
