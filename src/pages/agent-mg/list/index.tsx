import React from 'react';

import { Button } from 'antd';

import BaseComponent from '@/components/base';

interface PageProps {}
interface PageState {}

export default class AgentMgList extends BaseComponent<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    handleDemo = (): void => {
        this.props.history?.push('/agent-mg/create');
    };

    render(): JSX.Element {
        return (
            <div className="page-login">
                <div style={{ height: '1000px', backgroundColor: '#ccc' }}>
                    <Button onClick={this.handleDemo}>代理商</Button>
                </div>
            </div>
        );
    }
}
