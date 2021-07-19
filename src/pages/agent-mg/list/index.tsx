import React from 'react';

import { Button, Table } from 'antd';

import { BaseComponent } from '@/components/base';

import PageList, { Column, IFilterItem } from '@/components/page-list';

import http from '@/utils/http';

import { ITableDataItem, TDemo, TQueryParams } from './types';

interface PageProps {}
interface PageState {}

export default class AgentMgList extends BaseComponent<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    handleDemo = (): void => {
        this.props.history?.push('/agent-mg/create');
    };

    filters: IFilterItem[] = [
        {
            type: 'Input',
            label: '标签关键词',
            field: 'ratingLabel',
        },
    ];

    columns: Column[] = [
        {
            title: '排序',
            key: 'sortNo',
        },
        {
            title: '标题',
            width: 130,
            key: 'title',
        },
    ];

    handleSearch = (
        queryParams: TQueryParams,
        pageInfo: any,
    ): Promise<void | {
        total: number;
        tableData: ITableDataItem[];
    }> => {
        console.log(queryParams.name);
        const params = {
            channel: '1',
            biz: '1',
            pageInfo,
        };

        return http<TDemo>('get', '/admin/home/leftView.mvc', params)
            .then(res => {
                return {
                    total: 0,
                    tableData: res.data.rows || [],
                };
            })
            .catch(err => {
                return {
                    total: 23,
                    tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                };
                // this.props.history?.push('/login');
            });
    };

    render(): JSX.Element {
        return (
            <div className="page-login">
                <Button onClick={this.handleDemo}>代理商</Button>
                <PageList filters={this.filters} columns={this.columns} onSearch={this.handleSearch} isHaveBackBtn>
                    <div>fe</div>
                </PageList>
            </div>
        );
    }
}
