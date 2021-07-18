import { RouteConfig } from 'react-router-config';

import home from '../pages/index/index';
import login from '../pages/login';

import BaseLayout from '@/components/layout/layout';

import { agentMg } from '@/routers/agent-mg';
import { demoMg } from '@/routers/demo-mg';

const staticRoute: RouteConfig[] = [
    {
        path: '/home',
        component: home,
        exact: true,
    },
    {
        path: '/login',
        component: login,
    },
];

const dynamicRoute: RouteConfig[] = [...agentMg, ...demoMg];

const routes: RouteConfig[] = [
    ...staticRoute,
    {
        path: '/',
        component: BaseLayout,
        routes: dynamicRoute,
    },
];

export default routes;

export { staticRoute, dynamicRoute };
