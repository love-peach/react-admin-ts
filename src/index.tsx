import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from '@/routers';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

import '@/assets/style/index.scss';
import '@/assets/style/overwrite-antd.less';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </ConfigProvider>,
    document.getElementById('root'),
);
