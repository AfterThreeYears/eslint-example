
# eslint-plugin-mtmz

> 美图美妆ESLint插件集.

## ❗️ 依赖

- 首先需要依赖[ESLint](http://eslint.org/).
- 需要依赖v4或者更高版本的Node.js

## 🚀 Usage

### 1. 安装

```shell
  npm install --save-dev @meitu/eslint-plugin-mtmz
```

### 2. 修改 `.eslintrc.js`:

#### 修改配置:

```javascript
// .eslintrc.js
module.exports = {
  plugins: [
    'mtmz',
  ],
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'mtmz/no-relative': 'error',
    // ... 期望各位大佬提供更多规则
  },
};
```

所有的规则必须以 `mtmz/` 为前缀

## 🍟 Rules

提供 `--fix 🔧` 选项代表可以自动修复

### 最佳实践

|    | Rule ID | Description |
|:---|:--------|:------------|
| 🔧 | [no-relative](./docs/rules/no-relative.md) | 限制使用相对路径 |
|  | ...etc | ...etc |

