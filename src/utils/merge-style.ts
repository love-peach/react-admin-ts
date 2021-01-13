import { CSSProperties } from 'react';

export function mergeStyle(style1: CSSProperties, style2?: CSSProperties): CSSProperties {
    const array: any[] = [];

    if (style1 && Array.isArray(style1)) {
        array.push(...style1);
    } else if (style1) {
        array.push(style1);
    }
    if (style2 && Array.isArray(style2)) {
        array.push(...style2);
    } else if (style2) {
        array.push(style2);
    }
    const resultStyle = {};
    array.map((style) => {
        Object.assign(resultStyle, style);
    });

    return resultStyle;
}
