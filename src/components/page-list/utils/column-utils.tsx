import React from 'react';
import { Column } from '../types';
import { timeFormat } from '@/utils/tools';
import EncryptText from '@/components/encrypt-text';
import { getValue } from './tools';

const getText = (options: Column, row: any, column: any, index: any) => {
    if (options.render) {
        return options.render(row, column, index);
    }
    if (options.key) {
        return getValue(row, options.key + '');
    }
    return null;
};

const EncryptColumn = (options: Column) => {
    return {
        ...options,
        render: (row: any, column: any, index: any) => {
            const text = getText(options, row, column, index);

            if (text) {
                return <EncryptText text={text} />;
            }
            return '--';
        },
    };
};
const NullableColumn = (options: Column) => {
    const { format, ...other } = options;
    return {
        ...other,
        render: (row: any, column: any, index: any) => {
            const text = getText(options, row, column, index);

            return text === null ? '--' : text;
        },
    };
};
const DateColumn = (options: Column) => {
    const { format, ...others } = options;
    return {
        ...others,
        render: (row: any, column: any, index: any) => {
            const text = getText(options, row, column, index);
            if (text) {
                return timeFormat(text, format);
            }
            return '--';
        },
    };
};
const DictColumn = (options: Column) => {
    const { dict, ...others } = options;
    return {
        ...others,
        render: (row: any, column: any, index: any) => {
            const val = getText(options, row, column, index);
            if (val !== null) {
                // eslint-disable-next-line
                // @ts-ignore
                return <div className={'dict' + val}>{dict?.[val] || '--'}</div>;
            }
            return '--';
        },
    };
};

export const enhanceTableColumn = (columns?: Column[]): any => {
    return columns?.map(column => {
        if (!column.type) {
            return NullableColumn(column);
        }

        switch (column.type) {
            case 'date':
                return DateColumn(column);
            case 'encrypt':
                return EncryptColumn(column);
            case 'dict':
                return DictColumn(column);
            default:
                return column;
        }
    });
};
