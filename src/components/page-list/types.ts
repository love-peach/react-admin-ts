import { ReactNode } from 'react';

import { ColumnType as TableColumn } from 'antd/lib/table/interface';

import { FormComponentType } from '@/components/from-components';

export interface Column extends Exclude<TableColumn<any>, 'type'> {
    type?: 'index' | 'selection' | 'encrypt' | 'date' | 'dict';
    format?: string;
    dict?: object;
    hidden?: boolean;
}

export interface IComponentProps {
    placeholder?: string;
    style?: React.CSSProperties;
    options?: { label: string; value: string | number }[];
    [key: string]: any;
}

export interface IFilterItem {
    required?: boolean;
    type: FormComponentType;
    field: string;
    defaultValue?: any;
    label: string;
    alone?: boolean;
    onChange?: (queryParams: any, originValule?: any) => any;
    props?: IComponentProps | ((queryParams: any) => IComponentProps);
    render?: (queryParams: any) => ReactNode;
}

export type IPageInfo = {
    page: number;
    pageSize: number;
};

export interface IActionItem {
    position?: 'left' | 'right';
    content: ReactNode | ((params: { queryParams: any; selectedRows: any[]; pageInfo: IPageInfo }) => ReactNode);
}
