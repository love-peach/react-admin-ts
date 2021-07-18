import React from 'react';

import { renderRoutes, RouteConfig } from 'react-router-config';

interface PageProps {}
interface PageState {}

export default class EmptyNest extends React.Component<PageProps & RouteConfig, PageState> {
    constructor(props: PageProps & RouteConfig) {
        super(props);
    }

    render(): JSX.Element {
        const { route } = this.props;
        return <React.Fragment>{renderRoutes(route.routes)}</React.Fragment>;
    }
}
