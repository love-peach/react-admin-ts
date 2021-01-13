## webpack 配置说明

### loader

#### enforce 属性

loader 的书写顺序很重要，因为 loader 的职责单一，组合使用的原则，所有 loader 一个一个处理的顺序很重要。

怎么调整这个顺序很关键，但是如果你书写的时候已经排好了序，那就无所谓了，如下，就是从下往上处理的：

```js
module: {
    rules: [
        {
            test: /\.less$/,
            use: 'style-loader'
        },
        {
            test: /\.less$/,
            use: 'css-loader'
        },
        {
            test: /\.less$/,
            use: 'less-loader'
        }
    ]
},
```

可以通过一个 `enforce` 属性，默认有以下几个值

-   pre 优先处理
-   normal 正常处理（默认）
-   inline 其次处理
-   post 最后处理

```js
module: {
    rules: [
        {
            test: /\.less$/,
            use: 'less-loader',
            enforce: 'pre'
        },
        {
            test: /\.less$/,
            use: 'css-loader'
        },
        {
            test: /\.less$/,
            use: 'style-loader',
            enforce: 'post'
        }
    ]
},
```
