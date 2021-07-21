import React from 'react';

import { Button } from 'antd';

import PageForm, { ISchemaItem } from '@/components/page-from/';

interface PageProps {}
interface PageState {}

export default class AgentMgCreate extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    fromInitialValues = {
        name: '11111',
    };

    schema: ISchemaItem[] = [
        {
            type: 'Input',
            name: 'name',
            label: '名称',
        },
        {
            type: 'Input',
            name: 'age',
            label: '年龄',
            renderAfter: () => {
                return <div>12</div>;
            },
        },
    ];

    demo = (val: any, val2: any) => {
        console.log(val, val2);
    };

    demo2 = (val: any, val2: any) => {
        console.log(val, val2, '000');
    };

    handleCancel = () => {
        console.log('取消');
    };

    handleConfirm = (val: any) => {
        console.log(val);
    };

    render(): JSX.Element {
        return (
            <div>
                <div>
                    <PageForm
                        schema={this.schema}
                        initialValues={this.fromInitialValues}
                        onFieldsChange={this.demo}
                        onValuesChange={this.demo2}>
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
