import React from 'react';

import { BaseComponent } from '@/components/base';
import PageList, { Column, IFilterItem, IActionItem, IPageInfo } from '@/components/page-list';
import http from '@/api/http';
import { ITableDataItem, TDemo, TQueryParams } from './types';

interface PageProps {}
interface PageState {}

export default class AgentMgList extends BaseComponent<PageProps, PageState> {
    filters: IFilterItem[] = [
        {
            type: 'Input',
            label: '标签关键词1',
            field: 'name',
        },
        {
            type: 'Select',
            label: '标签关键词2',
            field: 'age',
            props: {
                options: [
                    {
                        label: '1212',
                        value: 111,
                    },
                ],
            },
        },
    ];

    columns: Column[] = [
        {
            title: '排序',
            key: 'sortNo',
        },
        {
            title: '标题',
            key: 'title',
        },
    ];

    actions: IActionItem[] = [
        {
            content: <span>添加优惠券</span>,
        },
    ];

    handleSearch = (
        queryParams: TQueryParams,
        pageInfo: IPageInfo,
    ): Promise<void | {
        total: number;
        tableData: ITableDataItem[];
    }> => {
        const params = {
            type: '3',
            currentPage: pageInfo.page,
            pageSize: pageInfo.pageSize,
        };

        return http<TDemo>('get', '/admin/head/college/page', params)
            .then(res => {
                return {
                    total: res.data?.pageInfo?.total || 0,
                    tableData: res.data?.pageList || [],
                };
            })
            .catch(err => {
                return {
                    total: 230,
                    tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                };
                // this.props.history?.push('/login');
            });
    };

    render(): JSX.Element {
        return (
            <PageList
                filters={this.filters}
                columns={this.columns}
                actions={this.actions}
                onSearch={this.handleSearch}
                isHaveBackBtn
            />
        );
    }
}
