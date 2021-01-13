## 项目搭建

### 安装依赖

`yarn add webpack webpack-cli`

### loader

#### eslint-loader (快要弃用了)

> This loader has been deprecated. Please use eslint-webpack-plugin

如果要使用 `eslint-loader`，注意它与 `babel-loader` 一起使用时的顺序，要先执行 `eslint-loader`;

#### tree shaking

`tree shaking` 是一种代码优化技术，它能够将无用的代码进行去除，下面举个简单的例子

```js
// a.js
export const a = 'a';
export const b = 'b'; // 不导出，删除
export const c = 'c'; // 导出不引用，删除

// index.js
import { a, c } from './a.js';
console.log(a);
if (false) {
    // 不会执行的代码，删除
    console.log('去除我');
}
```
