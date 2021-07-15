import home from '../pages/index';
import login from '../pages/login';

const routes = [
    {
        path: '/',
        component: home,
        exact: true,
    },
    {
        path: '/login',
        component: login,
    },
];

export default routes;
