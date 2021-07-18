import EmptyNest from '@/components/layout/empty-nest';

import AgentMgList from '@/pages/agent-mg/list';
import AgentMgCreate from '@/pages/agent-mg/create';

export const agentMg = [
    {
        name: '代理商管理',
        path: '/agent-mg',
        component: EmptyNest,
        routes: [
            {
                name: '代理商管理',
                path: '/agent-mg/list',
                component: AgentMgList,
            },
            {
                name: '代理商管理-创建',
                path: '/agent-mg/create',
                component: AgentMgCreate,
            },
        ],
    },
];
