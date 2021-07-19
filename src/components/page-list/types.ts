import { ReactNode } from 'react';

import { ColumnType as TableColumn } from 'antd/lib/table/interface';

import { FormComponentType } from '@/components/index';

export interface Column extends Exclude<TableColumn<any>, 'type'> {
    type?: 'index' | 'selection' | 'encrypt' | 'date' | 'dict';
    format?: string;
    dict?: object;
    hidden?: boolean;
}

export interface IComponentProps {
    placeholder?: string;
    style?: React.CSSProperties;
    options?: object[];
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

export type PageInfo = {
    page: number;
    pageSize: number;
};

export interface IActionItem {
    position?: 'left' | 'right';
    content: ReactNode | ((params: { queryParams: any; selectedRows: any[]; pageInfo: PageInfo }) => ReactNode);
}
