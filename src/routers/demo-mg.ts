import EmptyNest from '@/components/layout/empty-nest';

import AgentMgList from '@/pages/agent-mg/list';
import AgentMgCreate from '@/pages/agent-mg/create';

export const demoMg = [
    {
        name: 'demo',
        path: '/demo-mg',
        component: EmptyNest,
        routes: [
            {
                name: 'demo',

                path: '/demo-mg/list',
                exact: true,
                component: AgentMgList,
            },
            {
                name: 'demo-创建',
                path: '/demo-mg/create',
                exact: true,
                component: AgentMgCreate,
            },
        ],
    },
];
