import './index.scss';

import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { TableProps } from 'antd/lib/table/Table';
import { RowSelectionType } from 'antd/lib/table/interface';
import { PaginationConfig } from 'antd/lib/pagination';
import { ColSize } from 'antd/lib/col';
import classnames from 'classnames';
import { Form, Row, Col, Button, Table, Spin, Pagination } from 'antd';
import { formComponents as components } from '@/components/from-components';
import { Panel } from '@/components';
import { setValue, getValue, isEmpty } from './utils';
import { enhanceTableColumn } from './utils';
import { Column, IActionItem, IComponentProps, IFilterItem, IPageInfo } from './types';

const FormItem = Form.Item;

interface IProps {
    labelCol?: ColSize;
    filters?: IFilterItem[];
    columns?: Column[];
    tableProps?: TableProps<any>;
    paginationProps?: PaginationConfig;
    autoSearch?: boolean;
    actions?: IActionItem[];
    className?: string;
    selectionType?: RowSelectionType;
    isHaveBackBtn?: boolean; //是否显示返回按钮
    isResetRefresh?: boolean; //重置后是否刷新列表
    onSearch: (
        queryParams: Record<string, unknown>,
        pageInfo: IPageInfo,
    ) => Promise<{ tableData: Record<string, unknown>[]; total: number } | undefined | void> | undefined | void;
    onExport?: (queryParams: Record<string, unknown>) => void;
}

interface IState {
    queryParams: Record<string, unknown>;
    pageInfo: IPageInfo;
    tableData: Record<string, unknown>[];
    total: number;
    loading: boolean;
    selectedRows: Record<string, unknown>[];
    tableHeight: number;
}

const getDefaultPageInfo = (props: IProps) => {
    if (!props.paginationProps) {
        return { page: 1, pageSize: 10 };
    }
    const { pageSize = 10 } = props.paginationProps;
    return { page: 1, pageSize };
};

// eslint-disable-next-line
// @ts-ignore
@withRouter
export class PageList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            queryParams: this.getDefaultQueryParams(this.props.filters),
            pageInfo: getDefaultPageInfo(this.props),
            tableData: [],
            total: 0,
            selectedRows: [],
            loading: false,
            tableHeight: 200,
        };
    }

    static defaultProps = {
        autoSearch: true,
    };

    componentDidMount(): void {
        if (this.props.autoSearch) {
            this.queryTableData();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps: IProps): void {
        if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
            this.setState({
                queryParams: this.getDefaultQueryParams(nextProps.filters),
            });
        }
    }

    getDefaultQueryParams(filters?: IFilterItem[]): Record<string, unknown> {
        const obj: any = {};
        filters?.forEach(item => {
            setValue(obj as any, item.field, isEmpty(item.defaultValue) ? '' : item.defaultValue);
        });
        return obj;
    }

    refresh(): void {
        this.queryTableData();
    }

    search(): void {
        this.handleSearch();
    }

    private queryTableData() {
        const { queryParams, pageInfo } = this.state;
        this.setState({ loading: true });

        const result = this.props.onSearch(queryParams, pageInfo);
        if (!result) {
            this.setState({ loading: false });
            return;
        }
        result
            ?.then(data => {
                if (data) {
                    this.setState({
                        selectedRows: [],
                        tableData: data.tableData,
                        total: data.total,
                    });
                }
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    private handleFilterValueChange = (filter: IFilterItem, value: any, originValule?: any) => {
        const { field, onChange } = filter;
        let { queryParams } = this.state;

        setValue(queryParams as any, field, value);
        if (onChange) {
            queryParams = onChange(queryParams, originValule);
        }
        this.setState({ queryParams });
    };

    // 搜索
    handleSearch = (): void => {
        const { pageInfo } = this.state;
        pageInfo.page = 1;
        this.setState(
            {
                pageInfo,
            },
            () => this.queryTableData(),
        );
    };

    // 重置
    private handleReset = () => {
        const { isResetRefresh = true } = this.props;
        this.setState(
            {
                queryParams: this.getDefaultQueryParams(this.props.filters),
            },
            () => isResetRefresh && this.handleSearch(),
        );
    };

    // 分页 当前页改变事件
    private handleCurrentPageChange = (page: number) => {
        const { pageInfo } = this.state;
        pageInfo.page = page;
        this.setState(
            {
                pageInfo,
            },
            () => {
                this.queryTableData();
            },
        );
    };

    // 分页 pagesize 改变事件
    private handleSizeChange = (current: number, pageSize: number) => {
        const { pageInfo } = this.state;
        pageInfo.page = 1;
        pageInfo.pageSize = pageSize;
        this.setState(
            {
                pageInfo,
            },
            () => {
                this.queryTableData();
            },
        );
    };

    // 表格选中事件
    private handleSelectChange = (selectedRows: any) => {
        this.setState({
            selectedRows,
        });
    };

    render(): JSX.Element {
        const { tableData, loading, total, pageInfo } = this.state;
        const { columns, className, tableProps, paginationProps, selectionType } = this.props;

        return (
            <div className={classnames('page-list-wrap', className)}>
                {/* 查询条件区域 */}
                {this.renderCondition()}
                {/* 操作按钮区域 */}
                {this.renderActionBar(this.props, this.state)}
                {/* 列表区域 */}
                <Panel>
                    <Table
                        className={!tableData.length ? 'empty-table' : ''}
                        bordered
                        loading={loading}
                        dataSource={tableData}
                        columns={enhanceTableColumn(columns)}
                        pagination={false}
                        rowKey="id"
                        rowSelection={{
                            type: selectionType,
                            onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                                this.handleSelectChange(selectedRows);
                            },
                        }}
                        {...(tableProps || {})}
                    />
                    {!!total && (
                        <Pagination
                            className="list-pagination"
                            // layout="sizes, total, prev,pager, next"
                            current={pageInfo.page}
                            pageSize={pageInfo.pageSize}
                            defaultPageSize={pageInfo.pageSize}
                            total={total}
                            showTotal={total => `共 ${total} 条`}
                            showSizeChanger
                            pageSizeOptions={['10', '20', '30', '50']}
                            onChange={this.handleCurrentPageChange}
                            onShowSizeChange={this.handleSizeChange}
                            {...(paginationProps || {})}
                        />
                    )}
                </Panel>
            </div>
        );
    }

    // 渲染操作按钮item
    private renderActionItem = (items: IActionItem[]) => {
        const { queryParams, pageInfo, selectedRows } = this.state;

        return items.map((item, index) => {
            let content = null;
            if (typeof item.content === 'function') {
                content = item.content({
                    queryParams,
                    selectedRows,
                    pageInfo,
                });
            } else {
                content = item.content;
            }

            return <Fragment key={index}>{content}</Fragment>;
        });
    };

    // 渲染操作按钮
    private renderActionBar = (props: IProps, state: IState) => {
        const { actions } = props;
        const { queryParams, pageInfo, selectedRows } = state;
        if (!actions || !actions.length) {
            return null;
        }
        const leftActionItems = actions?.filter(_ => _.position !== 'right');
        const rightActionItems = actions?.filter(_ => _.position === 'right');

        return (
            <div className="action-bar">
                <div className="action-bar__inner">
                    <div className="action-bar__left">{this.renderActionItem(leftActionItems)}</div>
                    <div className="action-bar__right">{this.renderActionItem(rightActionItems)}</div>
                </div>
            </div>
        );
    };

    // 渲染查询条件item
    private renderFilterItem = (filter: IFilterItem) => {
        const { type, field, label, props } = filter;
        const { queryParams } = this.state;

        const Component = components[type];
        if (!Component) {
            return null;
        }
        let componentProps: IComponentProps = {};
        if (typeof props === 'function') {
            componentProps = props(queryParams);
        } else {
            componentProps = props as IComponentProps;
        }
        return (
            <FormItem label={label ? `${label}:` : false} key={field} required={filter.required}>
                {filter.render ? (
                    filter.render(queryParams)
                ) : (
                    <Component
                        {...(componentProps || {})}
                        value={getValue(queryParams as any, field)}
                        onChange={(value: any, originValule?: any) => {
                            this.handleFilterValueChange(filter, value, originValule);
                        }}
                    />
                )}
            </FormItem>
        );
    };

    // 渲染查询条件区域
    private renderCondition() {
        const { filters, labelCol, isHaveBackBtn, onExport } = this.props;
        const { queryParams } = this.state;
        if (!filters || !filters.length) {
            return null;
        }
        const aloneFilters = this.props.filters?.filter(_ => _.alone) || [];
        const normalFilters = this.props.filters?.filter(_ => !_.alone) || [];

        return (
            <Panel className="condition">
                <Form layout="inline" labelAlign="right" labelCol={labelCol}>
                    {aloneFilters.map((filter, index) => (
                        <Row key={index}>
                            <Col>{this.renderFilterItem(filter)}</Col>
                        </Row>
                    ))}

                    {normalFilters.map(filter => this.renderFilterItem(filter))}

                    <FormItem>
                        <div className="condition-btn-wrap">
                            <Button type="primary" onClick={this.handleSearch}>
                                查询
                            </Button>
                            <Button onClick={this.handleReset}>重置</Button>
                            {onExport && (
                                <Button type="primary" onClick={(): void => onExport(queryParams)}>
                                    导出
                                </Button>
                            )}
                            {/* eslint-disable-next-line */}
                            {/* @ts-ignore */}
                            {isHaveBackBtn && <Button onClick={() => this.props.history?.goBack()}>返回</Button>}
                        </div>
                    </FormItem>
                </Form>
            </Panel>
        );
    }
}
