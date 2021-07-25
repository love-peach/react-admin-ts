import React from 'react';

import { Button, Input, Form } from 'antd';

import PageForm, { ISchemaItem } from '@/components/page-from/';

interface PageProps {}
interface PageState {}

export default class AgentMgCreate extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    fromInitialValues = {
        name: '',
    };

    schema: ISchemaItem[] = [
        {
            type: 'Input',
            name: 'name',
            label: '名称',
            rules: [{ required: true, message: '名称必填' }],
        },
        {
            type: 'Input',
            name: 'name1',
            label: '名称',
            rules: [{ required: true, message: '名称必填' }],
        },
        {
            type: 'Input',
            name: 'name2',
            label: '名称',
            rules: [{ required: true, message: '名称必填' }],
        },
        {
            type: 'Input',
            name: 'name3',
            label: '名称',
            rules: [{ required: true, message: '名称必填' }],
        },
        {
            type: 'Input',
            name: 'name4',
            label: '名称',
            rules: [{ required: true, message: '名称必填' }],
        },
        {
            type: 'Input',
            name: 'address',
            label: '地址',
            rules: [{ required: true, message: '名称必填' }],
        },
        {
            type: 'Input',
            name: 'age',
            label: '年龄',
            rules: [{ required: true, message: '年龄必填' }],
            renderBefore: () => {
                return <div>12</div>;
            },
            render: () => {
                return <Input />;
            },
            renderAfter: () => {
                return (
                    <Form.Item
                        noStyle
                        label="Password"
                        name="demo"
                        rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input />
                    </Form.Item>
                );
            },
        },
    ];

    handleOnValuesChange = (currentValue: any, formValues: any) => {
        console.log(currentValue, formValues);
    };

    handleCancel = () => {
        console.log('取消');
    };

    handleConfirm = (val: any) => {
        console.log(val);
    };

    onFinish = (values: any) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render(): JSX.Element {
        return (
            <div>
                <div>
                    <PageForm
                        // layout="inline"
                        schema={this.schema}
                        // labelCol={{ span: 8 }}
                        initialValues={this.fromInitialValues}
                        onValuesChange={this.handleOnValuesChange}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}>
                        <Button onClick={this.handleCancel}>取消</Button>
                        <Button type="primary" onClick={this.handleConfirm}>
                            确认
                        </Button>
                    </PageForm>
                </div>
            </div>
        );
    }
}
