## 代码规范

### editorConfig

跨编辑器和 IDE 编写代码，保持一致的简单编码风格

### prettier

专注于代码格式化的工具，美化代码

-   "off" 或 0 - 关闭规则
-   "warn" 或 1 - 开启规则
-   "error" 或 2 - 开启规则

### eSLint

代码质量检测、编码风格约束等

#### 注释方式

```js
/* eslint-disable */    --禁用全部规则  放在文件顶部则整个文件范围都不检查
/* eslint-disable no-alert, no-console */  --禁用某些规则
// eslint-disable-line     --当前行上禁用规则
// eslint-disable-next-line --下一行上禁用规则

单行忽略
// @ts-ignore

忽略全文
// @ts-nocheck

取消忽略全文
// @ts-check
```

#### 配置文件优先级

1. .eslintrc.js
2. .eslintrc.yaml
3. .eslintrc.yml
4. .eslintrc.json （可写注释）
5. .eslintrc （貌似弃用了）
6. package.json
