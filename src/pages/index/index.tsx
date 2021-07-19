import './index.scss';

import React from 'react';
import { BaseComponent } from '@/components/base/index';

import http from '@/utils/http';

import Logo from '@/assets/images/logo.png';

import { Button } from 'antd';

interface PageProps {}
interface PageState {}

export default class extends BaseComponent<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    handleJump = (): void => {
        http('get', '/admin/home/leftView.mvc', { channel: '1', biz: '1' })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err, '2222');
                this.props.history?.push('/login');
            });
    };

    render(): JSX.Element {
        return (
            <div>
                <div className="page-index">
                    <h1>111223114111</h1>
                    <input placeholder="1212" type="text" />
                    <img src={Logo} alt="" />
                </div>
                <Button type="primary" onClick={this.handleJump.bind(this)}>
                    333
                </Button>
            </div>
        );
    }
}
