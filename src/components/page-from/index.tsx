import './index.scss';

import React from 'react';
import { Button, Form } from 'antd';
import { setValue, getValue } from '@/components/page-list/utils';
import { formComponents as components } from '@/components/from-components';
import { IFormFiled, IComponentProps } from './types';
import classnames from 'classnames';

import { FormLayout } from 'antd/lib/form/Form';

const FormItem = Form.Item;

interface IProps {
    className?: string;

    layout: FormLayout;
    loading?: boolean;
    rules?: any;
    schema: IFormFiled[];
    labelPosition?: 'right' | 'left' | 'top';
    labelWidth?: string | number;
    labelSuffix?: string;
    isInline?: boolean;
    isShowBottom?: boolean;
    cancelButtonText?: string;
    confirmButtonText?: string;
    isSubmitBtn?: boolean;
    cancelType?: string;
    confirmType?: string;
    onChange?: (formData: any) => void;
    onValidate?: (result: boolean) => void;
    onSubmit?: () => void;
    onCancel?: () => void;
    bottomRender?: () => React.ReactNode;
}

interface IState {}

export class PageForm extends React.Component<IProps, IState> {
    formRef: any | null = null;

    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    validField(field: any) {
        this.formRef?.validateField(field, (valid: any) => {
            console.log('field', valid);
        });
    }

    handleCancel = (): void => {
        this.props.onCancel?.();
    };

    handleConfirm = (): void => {
        const { onSubmit, onValidate } = this.props;
        this.formRef?.validate((valid: boolean) => {
            onValidate?.(valid);
            if (valid) {
                onSubmit?.();
            }
        });
    };

    getValue(field: string) {
        // return getValue(this.props.formData as any, field);
    }

    setValue(field: string, val: any): void {
        // const { formData, onChange } = this.props;
        // onChange?.(setValue({ ...(formData || {}) }, field, val) as any);
    }

    render(): JSX.Element {
        const { className, isShowBottom = true } = this.props;
        return (
            <div className={classnames('comp-form-page', className)}>
                <div className="comp-form-page__form">{this.renderForm()}</div>
                {isShowBottom && <div className="comp-form-page__bottom">{this.renderBottom()}</div>}
            </div>
        );
    }

    renderForm(): JSX.Element {
        const { rules, schema, labelPosition, labelSuffix, labelWidth, layout = 'horizontal' } = this.props;
        return (
            <Form
                ref={ref => {
                    this.formRef = ref;
                }}
                layout={layout}
                // model={formData}
                {...{ labelPosition, labelSuffix, labelWidth, rules }}>
                {schema?.map(this.renderFormItem)}
            </Form>
        );
    }

    renderFormItem = (fieldSetting: IFormFiled, index: number): JSX.Element | null => {
        const {
            label,
            field,
            type,
            labelDesc,
            labelIcon,
            labelWidth,
            render,
            renderBefore,
            renderAfter,
            props,
            rules,
        } = fieldSetting;

        const Component = components[type];
        if (!Component) {
            return null;
        }
        const componentProps: IComponentProps = props as IComponentProps;

        return (
            // <FormItem label={`${label}`} key={field} prop={field} rules={rules}>
            <FormItem label={`${label}`} key={field} rules={rules}>
                {render ? (
                    render()
                ) : (
                    <>
                        {renderBefore?.()}
                        <Component {...(componentProps || {})} />
                        {renderAfter?.()}
                    </>
                )}
            </FormItem>
        );
    };

    renderBottom(): JSX.Element | React.ReactNode {
        const { loading, bottomRender, isSubmitBtn, cancelType, confirmType } = this.props;
        if (bottomRender) {
            return bottomRender();
        }
        const { cancelButtonText = '取消', confirmButtonText = '确定' } = this.props;
        return (
            <>
                <Button onClick={this.handleCancel}>{cancelButtonText}</Button>
                <Button type="primary" loading={loading} disabled={isSubmitBtn} onClick={this.handleConfirm}>
                    {confirmButtonText}
                </Button>
            </>
        );
    }
}
