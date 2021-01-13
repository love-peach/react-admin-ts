import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

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

function routerConfig() {
    return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
}

export default routerConfig;
