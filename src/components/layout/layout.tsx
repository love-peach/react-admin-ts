import './layout.scss';

import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Layout } from 'antd';
import SideMenu from '@/components/layout/side-menu';

const { Header, Content, Sider } = Layout;

interface PageProps {}
interface PageState {}

export default class Login extends React.Component<PageProps & RouteConfig, PageState> {
    constructor(props: PageProps & RouteConfig) {
        super(props);
    }

    render(): JSX.Element {
        const { route } = this.props;
        return (
            <Layout className="layout-wrap">
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                    <div className="logo" />
                    <SideMenu />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ padding: '24px 16px 16px', overflow: 'initial' }}>
                        <div className="site-layout-background">{renderRoutes(route.routes)}</div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
