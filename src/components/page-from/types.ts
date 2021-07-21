import { ReactNode } from 'react';
import { FormComponentType } from '@/components/from-components';

import { FormItemProps } from 'antd';

export interface IComponentProps {
    placeholder?: string;
    style?: React.CSSProperties;
    options?: { label: string; value: string | number }[];
    [key: string]: any;
}

export interface ISchemaItem extends FormItemProps {
    type: FormComponentType;
    name: string;
    props?: IComponentProps;
    render?: () => ReactNode;
    renderBefore?: () => ReactNode;
    renderAfter?: () => ReactNode;
}
