import React from 'react';

import { RouteConfig, matchRoutes } from 'react-router-config';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import { dynamicRoute } from '@/routers';

const { SubMenu } = Menu;

const MAX_SHOW_LEVEL = 2;

const renderMenuItem = (menu: RouteConfig, level: number): JSX.Element | null => {
    if (level > MAX_SHOW_LEVEL) {
        return null;
    }
    const menuClickAreaStyle: any = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        opacity: 0,
    };
    return (
        <Menu.Item key={menu.path + ''} icon={<UserOutlined />}>
            {menu.name}
            <Link to={menu.path + ''} style={menuClickAreaStyle} />
        </Menu.Item>
    );
};

const renderSubMenu = (menu: RouteConfig, level: number): JSX.Element | null => {
    if (level > MAX_SHOW_LEVEL) {
        return null;
    }
    return (
        <SubMenu key={menu.path + ''} title={menu.name}>
            {menu?.routes?.map(subMenu => {
                return shouldRenderSubMenu(subMenu, level + 1)
                    ? renderSubMenu(subMenu, level + 1)
                    : renderMenuItem(subMenu, level + 1);
            })}
        </SubMenu>
    );
};

const shouldRenderSubMenu = (menu: RouteConfig, level: number): boolean => {
    if (level > MAX_SHOW_LEVEL - 1) {
        return false;
    }
    return !!menu.routes?.length;
};

const SideMenu = withRouter(({ history }) => {
    const matchRoutesArray = matchRoutes(dynamicRoute, history.location.pathname);
    let matchRoutesfirst = '';
    if (matchRoutesArray && matchRoutesArray.length) {
        matchRoutesfirst = matchRoutesArray[0].route.path + '';
    }
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={[matchRoutesfirst]}
            selectedKeys={[history.location.pathname]}>
            {dynamicRoute.map(menu => {
                return shouldRenderSubMenu(menu, 1) ? renderSubMenu(menu, 1) : renderMenuItem(menu, 1);
            })}
        </Menu>
    );
});

export default SideMenu;
