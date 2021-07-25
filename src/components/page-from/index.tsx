import './index.scss';

import React from 'react';
import { Button, Form, FormProps, Input, Space } from 'antd';
import { setValue, getValue } from '@/components/page-list/utils';
import { formComponents as components } from '@/components/from-components';
import { ISchemaItem, IComponentProps } from './types';
import classnames from 'classnames';
import { FormInstance } from 'antd';
import { FormLayout } from 'antd/lib/form/Form';

import { Panel } from '@/components';

const FormItem = Form.Item;

interface IProps extends FormProps {
    schema: ISchemaItem[];

    loading?: boolean;
    isShowBottom?: boolean;
    cancelButtonText?: string;
    confirmButtonText?: string;

    onSubmit?: () => void;
    onCancel?: () => void;
    bottomRender?: () => React.ReactNode;
}

interface IState {}

export * from './types';

export default class PageForm extends React.Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();

    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    // validField(field: any) {
    //     this.formRef?.validateField(field, (valid: any) => {
    //         console.log('field', valid);
    //     });
    // }

    handleCancel = (): void => {
        this.props.onCancel?.();
    };

    handleConfirm = (): void => {
        const { onSubmit } = this.props;
        // this.formRef?.validate((valid: boolean) => {
        //     onValidate?.(valid);
        //     if (valid) {
        //         onSubmit?.();
        //     }
        // });
    };

    getValue(field: string) {
        // return getValue(this.props.formData as any, field);
    }

    setValue(field: string, val: any): void {
        // const { formData, onChange } = this.props;
        // onChange?.(setValue({ ...(formData || {}) }, field, val) as any);
    }

    render(): JSX.Element {
        const {
            className,
            isShowBottom = true,
            schema,
            loading,
            cancelButtonText,
            confirmButtonText,
            onSubmit,
            onCancel,
            bottomRender,
            ...restFormProps
        } = this.props;

        return (
            <Panel className="comp-form-page">
                <Form name="basic" ref={this.formRef} {...restFormProps}>
                    {schema?.map(this.renderFormItem)}

                    <Form.Item label=" " colon={false}>
                        {isShowBottom && <div>{this.renderBottom()}</div>}
                    </Form.Item>
                </Form>
            </Panel>
        );
        // <div className={classnames('comp-form-page', className)}>
        //     <div className="comp-form-page__form">{this.renderForm()}</div>
        //     {isShowBottom && <div className="comp-form-page__bottom">{this.renderBottom()}</div>}
        // </div>
    }

    renderFormItem = (schemaItem: ISchemaItem): JSX.Element | null => {
        const { label, name, type, render, renderBefore, renderAfter, props, rules } = schemaItem;

        const Component = components[type];

        if (!Component) {
            return null;
        }

        return (
            <Form.Item label={label} name={name} key={name} rules={rules}>
                <Space>
                    {renderBefore?.()}
                    {render ? render() : <Component {...(props || {})} />}
                    {renderAfter?.()}
                </Space>
            </Form.Item>
        );
    };

    renderBottom(): JSX.Element | React.ReactNode {
        const { loading, bottomRender } = this.props;
        if (bottomRender) {
            return bottomRender();
        }
        const { cancelButtonText = '取消', confirmButtonText = '确定' } = this.props;
        return (
            <Space>
                <Button onClick={this.handleCancel}>{cancelButtonText}</Button>

                <Button type="primary" htmlType="submit" loading={loading} onClick={this.handleConfirm}>
                    {confirmButtonText}
                </Button>

                {/* <Button type="primary" loading={loading} onClick={this.handleConfirm}>
                    {confirmButtonText}
                </Button> */}
            </Space>
        );
    }
}
