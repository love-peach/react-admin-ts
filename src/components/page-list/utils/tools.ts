const charCodeOfDot = '.'.charCodeAt(0);
const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp(
    '[^.[\\]]+' +
        '|' +
        '\\[(?:' +
        '([^"\'][^[]*)' +
        '|' +
        '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
        ')\\]' +
        '|' +
        '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
    'g',
);

const stringToPath = (string: string) => {
    const result: string[] = [];
    if (string.charCodeAt(0) === charCodeOfDot) {
        result.push('');
    }
    string.replace(rePropName, (match, expression, quote, subString): any => {
        let key = match;
        if (quote) {
            key = subString.replace(reEscapeChar, '$1');
        } else if (expression) {
            key = expression.trim();
        }
        result.push(key);
    });
    return result;
};

const isObject = (value: object) => {
    const type = typeof value;
    return value !== null && type === 'object';
};

const isIndex = (key: any) => {
    return typeof key === 'number' || /^(?:0|[1-9]\d*)$/.test(key);
};

export const setValue = (data: object, src: string | (string | number)[], value: any): any => {
    if (!isObject(data)) {
        return data;
    }
    const path = Array.isArray(src) ? src : stringToPath(src);

    const length = path.length;
    const lastIndex = length - 1;

    let index = -1;
    let nested: any = data;

    while (nested !== null && ++index < length) {
        const key = path[index];
        let newValue = value;

        if (index !== lastIndex) {
            const objValue = nested[key];
            newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
        }
        nested[key] = newValue;
        nested = nested[key];
    }
    return data;
};

export const getValue = (data: object, src: string | (string | number)[], defaultValue: any = ''): any => {
    if (data === null) {
        return defaultValue;
    }
    const path = Array.isArray(src) ? src : stringToPath(src);
    let index = 0;
    const length = path.length;
    while (data !== null && index < length) {
        // eslint-disable-next-line
        // @ts-ignore
        data = data[path[index++]];
    }
    return index === length ? data : defaultValue;
};

export const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || value === '';
};
