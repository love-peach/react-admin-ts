module.exports = {
    endOfLine: 'auto',
    tabWidth: 4,
    useTabs: false,
    printWidth: 120,
    semi: true, // 行尾是否使用分号，默认为true
    trailingComma: 'all',
    singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
    bracketSpacing: true, // 花括号两边加空格
    jsxBracketSameLine: true, // jsx
    arrowParens: 'avoid',
    parser: 'typescript',
    overrides: [
        {
            files: '*.md',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
