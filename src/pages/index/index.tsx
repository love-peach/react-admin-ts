import './index.scss';

import React from 'react';
import { BaseComponent } from '@/components/base/index';
import Logo from '@/assets/images/logo.png';

interface PageProps {}
interface PageState {}

export default class extends BaseComponent<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <div className="page-index">
                    <h1>111223114111</h1>
                    <input placeholder="1212" type="text" />
                    <img src={Logo} alt="" />
                </div>
            </div>
        );
    }
}
