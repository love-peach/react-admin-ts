import { ReactNode } from 'react';
import { FormComponentType } from '@/components/from-components';

export interface IComponentProps {
    placeholder?: string;
    style?: React.CSSProperties;
    options?: { label: string; value: string | number }[];
    [key: string]: any;
}

export interface IFormFiled {
    type: FormComponentType;
    field: string;
    render?: () => ReactNode;
    renderBefore?: () => ReactNode;
    renderAfter?: () => ReactNode;
    rules?: any;
    labelWidth?: number | string;
    label?: string;
    labelDesc?: string;
    labelIcon?: ReactNode;
    required?: boolean;
    props?: IComponentProps;
}
